/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DiscussionItem from "../discussion-item";
import {
  getCurrentThreadById,
  getLastThreadUser,
  threadSliceActions,
} from "../../store/slice/threadSlice";
import { getMyThreads } from "../../store/slice/threadSlice";

const Discussions = () => {
  const { threads } = useSelector((state) => state.thread);
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleClickDiscussionItem = (id, interlocutor) => {
    dispatch(threadSliceActions.setCurrentInterlocuteur(interlocutor));
    dispatch(getCurrentThreadById(id));
  };

  useEffect(() => {
    dispatch(getMyThreads());
  }, []);

  useEffect(() => {
    if (currentUser?.id) {
      const url = new URL(process.env.REACT_APP_MERCURE_PUBLIC_URL);
      url.searchParams.append("topic", `http://monsite.com/${currentUser.id}`);

      const eventSource = new EventSource(url);
      eventSource.onmessage = async () => {
        dispatch(getLastThreadUser());
      };
    }
  }, [currentUser?.id]);

  return (
    <>
      {(threads || []).map((data) => (
        <DiscussionItem
          key={data.id}
          onClick={handleClickDiscussionItem}
          currentUser={currentUser}
          {...data}
        />
      ))}
    </>
  );
};

export default Discussions;
