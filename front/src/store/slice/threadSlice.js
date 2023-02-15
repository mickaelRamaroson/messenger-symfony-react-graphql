import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CREATE_THREAD } from "../../graphql/mutation/createThread";
import axiosGraphql from "../../helpers/axiosGraphql";

const initialState = {
  currentThread: null,
  threads: [],
};

const threadSlice = createSlice({
  initialState,
  name: "thread",
  reducers: {
    setCurentThead(state, action) {
      state.currentThread = action.payload;
    },
    setThreads(state, action) {
      state.threads = action.payload;
    },
  },
});

export default threadSlice.reducer;
export const threadSliceActions = threadSlice.actions;

export const createThread = createAsyncThunk(
  "createThread",
  async (idTo, { dispatch, getState }) => {
    const idFrom = getState().auth.currentUser.id;
    const {
      data: { createThread },
    } = await axiosGraphql({
      query: CREATE_THREAD,
      variables: { idFrom, idTo },
    });
    dispatch(threadSliceActions.setCurentThead(createThread));
    return createThread;
  }
);
