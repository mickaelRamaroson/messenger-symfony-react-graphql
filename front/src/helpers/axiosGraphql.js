import axios from "axios";
import { store } from "../store";
import { getToken } from "../store/slice/authSlice";

const axiosGraphql = async (args, headers = {}) => {
  const state = store.getState();
  const { data } = await axios.post(process.env.REACT_APP_API_GRAPHQL, args, {
    headers: {
      ...headers,
      "Content-Type": "application/json",
      Authorization: getToken(state) || "no need Authorization.",
    },
  });
  return {
    data: data.data,
    errors: data.errors || null,
  };
};

export default axiosGraphql;
