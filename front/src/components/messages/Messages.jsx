/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLastMessageThread } from "../../store/slice/threadSlice";
import MessageInput from "../message-input";
import MessageItem from "../message-item";

const scrollBottom = () => {
  const container = document.getElementById("messages-container");
  if (container) {
    container.scrollTop = container.scrollHeight;
  }
};

const Messages = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const { currentInterlocutor, currentThread } = useSelector(
    (state) => state.thread
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser?.id && currentThread?.id) {
      const url = new URL(process.env.REACT_APP_MERCURE_PUBLIC_URL);
      url.searchParams.append(
        "topic",
        `http://monsite.com/${currentUser.id}/${currentThread.id}`
      );
      const eventSource = new EventSource(url);
      eventSource.onmessage = () => {
        scrollBottom();
        dispatch(getLastMessageThread(currentThread.id));
      };
    }
  }, [currentUser?.id, currentThread?.id]);

  useEffect(() => {
    if (currentThread?.messages?.length && currentInterlocutor) {
    }
    scrollBottom();
    window.addEventListener("resize", scrollBottom);
    return () => {
      window.removeEventListener("resize", scrollBottom);
    };
  }, [currentThread, currentInterlocutor]);

  return (
    <>
      {currentInterlocutor && currentThread && (
        <div className="w-full h-full flex flex-col">
          <div className="w-full p-4 border-b border-gray-600 flex items-center">
            <Avatar sx={{ bgcolor: currentInterlocutor.color }}>
              {currentInterlocutor.firstname.charAt(0)}
            </Avatar>
            <div className="text-lg font-semibold ml-4">
              {currentInterlocutor.firstname}
            </div>
          </div>
          <div className="grow  flex flex-col">
            <div
              id="messages-container"
              className="grow flex flex-col overflow-y-auto h-0"
            >
              <div className="grow" />
              <div className="px-4 py-4">
                {(currentThread.messages || []).map((item) => (
                  <MessageItem key={item.id} {...item} />
                ))}
              </div>
            </div>
            <div className="w-full flex">
              <MessageInput />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Messages;
