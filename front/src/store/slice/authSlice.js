import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { REGISTRATION } from "../../graphql/mutation/registration";
import { LOGIN } from "../../graphql/query/login";
import axiosGraphql from "../../helpers/axiosGraphql";

const initialState = {
  currentUser: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;

export const getToken = (state) => {
  return state.auth.token;
};

export const registration = createAsyncThunk(
  "registration",
  async (user, { dispatch }) => {
    dispatch(authActions.setLoading(true));
    delete user.confirmPassword;
    delete user.confirmPassword;
    const {
      data: { registerUser: newUser },
      errors,
    } = await axiosGraphql({
      query: REGISTRATION,
      variables: user,
    });
    if (newUser) {
      dispatch(authActions.setCurrentUser(newUser));
      dispatch(authActions.setToken(newUser.token));
      dispatch(authActions.setLoading(false));
    } else {
      console.log(errors);
      const errorUnique = errors.find(({ code }) => code === 1062);
      if (errorUnique) {
        dispatch(authActions.setError("Adresse email existe déjà."));
      }
      dispatch(authActions.setLoading(false));
      return null;
    }
    return newUser;
  }
);

export const login = createAsyncThunk("login", async (user, { dispatch }) => {
  dispatch(authActions.setLoading(true));
  const {
    data: { login },
    errors,
  } = await axiosGraphql({ query: LOGIN, variables: user });
  if (login) {
    dispatch(authActions.setCurrentUser(login));
    dispatch(authActions.setToken(login.token));
    dispatch(authActions.setLoading(null));
    return login;
  } else {
    const error = errors.find(
      ({ message }) => message === "Authentication Error"
    );
    dispatch(authActions.setError("Authentication Error"));
  }
  dispatch(authActions.setLoading(null));
  return null;
});
