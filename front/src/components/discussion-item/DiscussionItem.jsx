/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar } from "@mui/material";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import getRandomColor from "../../helpers/generatorColorRamdom";
import { getLastMessageThread } from "../../store/slice/threadSlice";

const ramdomColor = getRandomColor();

const DiscussionItem = ({
  participants,
  onClick,
  currentUser,
  id,
  lastMessage,
}) => {
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const { currentThread } = useSelector((state) => state.thread);
  const dispatch = useDispatch();

  const handleClick = () => {
    setHasNewMessage(false);
    onClick && onClick(id, { ...interlocutor, color: ramdomColor });
  };

  useEffect(() => {
    if (currentUser?.id && currentThread?.id !== id) {
      const url = new URL(process.env.REACT_APP_MERCURE_PUBLIC_URL);
      url.searchParams.append(
        "topic",
        `http://monsite.com/${currentUser.id}/${id}`
      );

      const eventSource = new EventSource(url);
      eventSource.onmessage = async () => {
        await dispatch(getLastMessageThread(id));
        setHasNewMessage(true);
      };
    }
  }, [currentUser?.id, id]);

  const active = useMemo(
    () =>
      currentThread?.id !== id &&
      ((lastMessage && !lastMessage.isRead) || hasNewMessage),
    [lastMessage, id, hasNewMessage, currentThread]
  );

  const interlocutor = useMemo(
    () => participants.filter((item) => item.id !== currentUser?.id)[0],
    [participants, currentUser]
  );

  return (
    <div
      className={classNames(
        "px-4 py-3 flex items-center cursor-pointer hover:bg-gray-700 w-full border-b border-gray-500",
        {
          "bg-gray-700": active,
        }
      )}
      onClick={handleClick}
    >
      <Avatar sx={{ height: 56, width: 56, bgcolor: ramdomColor }}>
        {interlocutor?.firstname?.charAt(0)}
      </Avatar>
      <div className="ml-4">
        <div className="username text-lg font-semibold">
          {interlocutor?.firstname}
        </div>
        <p
          className={classNames("last-message  font-light text-sm", {
            "!font-semibold": active,
          })}
        >
          {lastMessage?.content}
        </p>
      </div>
    </div>
  );
};

export default DiscussionItem;
