import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CREATE_MESSAGE } from "../../graphql/mutation/createMessage";
import { CREATE_THREAD } from "../../graphql/mutation/createThread";
import { SET_READ_MESSAGES } from "../../graphql/mutation/setReadMessages";
import {
  GET_LAST_MESSAGE_THREAD,
  GET_LAST_USER_THREAD,
  GET_MY_THEADS,
  GET_THREAD_BY_ID,
} from "../../graphql/query/thread";
import axiosGraphql from "../../helpers/axiosGraphql";

const initialState = {
  currentThread: null,
  threads: [],
  loading: true,
  currentInterlocutor: null,
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
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setCurrentInterlocuteur(state, action) {
      state.currentInterlocutor = action.payload;
    },
  },
});

export default threadSlice.reducer;
export const threadSliceActions = threadSlice.actions;

export const createThread = createAsyncThunk(
  "createThread",
  async (idTo, { dispatch, getState }) => {
    const idFrom = getState().auth.currentUser.id;
    const { threads } = getState().thread;
    const {
      data: { createThread },
    } = await axiosGraphql({
      query: CREATE_THREAD,
      variables: { idFrom, idTo },
    });
    dispatch(threadSliceActions.setCurentThead(createThread));
    dispatch(threadSliceActions.setThreads([createThread, ...threads]));
    axios.post(
      process.env.REACT_APP_API_URL_BASE + `/publish-new-thread/${idTo}`
    );
    return createThread;
  }
);

export const getMyThreads = createAsyncThunk(
  "getMyThreads",
  async (_, { getState, dispatch }) => {
    dispatch(threadSliceActions.setLoading(true));
    let results = [];
    try {
      const userId = getState().auth.currentUser.id;
      const {
        data: { userThreads },
      } = await axiosGraphql({
        query: GET_MY_THEADS,
        variables: { userId },
      });
      dispatch(threadSliceActions.setThreads(userThreads));
    } catch (e) {
      dispatch(threadSliceActions.setThreads([]));
    }
    dispatch(threadSliceActions.setLoading(false));
    return results;
  }
);

export const sendMessage = createAsyncThunk(
  "sendMessage",
  async (content, { dispatch, getState }) => {
    const {
      currentUser: { id: fromId },
    } = getState().auth;
    const {
      currentThread: { id: threadId },
      currentThread,
      currentInterlocutor: { id: idInterlocutor },
      threads,
    } = getState().thread;

    const {
      data: { createMessage },
    } = await axiosGraphql({
      query: CREATE_MESSAGE,
      variables: { content, fromId, threadId },
    });

    // add new message to his thread
    dispatch(
      threadSliceActions.setCurentThead({
        ...currentThread,
        messages: [...currentThread.messages, createMessage],
      })
    );

    dispatch(
      threadSliceActions.setThreads(
        threads.map((item) => {
          if (item.id === currentThread.id) {
            return { ...item, lastMessage: createMessage };
          }
          return item;
        })
      )
    );

    // publish new message
    axios.post(
      process.env.REACT_APP_API_URL_BASE +
        `/publish-new-message/${idInterlocutor}/${threadId}`
    );
  }
);

export const getCurrentThreadById = createAsyncThunk(
  "getCurrentThreadById",
  async (id, { dispatch }) => {
    const {
      data: { thread },
    } = await axiosGraphql({
      query: GET_THREAD_BY_ID,
      variables: { id },
    });
    dispatch(threadSliceActions.setCurentThead(thread));
  }
);

export const getLastMessageThread = createAsyncThunk(
  "getLastMessageThead",
  async (threadId, { dispatch, getState }) => {
    const { threads, currentThread } = getState().thread;

    const {
      data: { lastMessageThread },
    } = await axiosGraphql({
      query: GET_LAST_MESSAGE_THREAD,
      variables: { threadId },
    });

    // set in top the discussion with new message
    dispatch(
      threadSliceActions.setThreads([
        {
          ...(threads.find((item) => item.id === threadId) || {}),
          lastMessage: lastMessageThread,
        },
        ...threads.filter((item) => item.id !== threadId),
      ])
    );

    // add new message to the cuurent thread
    if (currentThread && threadId === currentThread.id) {
      dispatch(
        threadSliceActions.setCurentThead({
          ...currentThread,
          messages: [...currentThread.messages, lastMessageThread],
        })
      );
    }
    return lastMessageThread;
  }
);

export const getLastThreadUser = createAsyncThunk(
  "getLastThreadUser",
  async (_, { getState, dispatch }) => {
    const {
      currentUser: { id: userId },
    } = getState().auth;
    const { threads } = getState().thread;
    const {
      data: { lastThreadByUserId },
    } = await axiosGraphql({
      query: GET_LAST_USER_THREAD,
      variables: { userId },
    });
    dispatch(threadSliceActions.setThreads([lastThreadByUserId, ...threads]));
    return lastThreadByUserId;
  }
);

export const setReadMessages = createAsyncThunk(
  "setReadMessages",
  (messageIds) => {
    axiosGraphql({
      query: SET_READ_MESSAGES,
      variables: { messageIds },
    });
  }
);
