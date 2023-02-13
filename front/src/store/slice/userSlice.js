import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { USERS } from "../../graphql/query/user";
import axiosGraphql from "../../helpers/axiosGraphql";

const initialState = {
  users: [],
  loading: null,
};

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export default userSlice.reducer;
export const userSliceActions = userSlice.actions;

export const getUsers = createAsyncThunk(
  "getUsers",
  async (_, { dispatch }) => {
    dispatch(userSliceActions.setLoading(true));
    const {
      data: { users },
    } = await axiosGraphql({ query: USERS });
    dispatch(userSliceActions.setUsers(users));
    dispatch(userSliceActions.setLoading(false));
  }
);
