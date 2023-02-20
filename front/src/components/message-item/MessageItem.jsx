/* eslint-disable react-hooks/exhaustive-deps */
import classNames from "classnames";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

const MessageItem = ({ id, content, createdAt, isRead, user }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const [isReadState, setIsReadState] = useState(false);

  const myMessage = useMemo(
    () => user.id === currentUser.id,
    [user, currentUser]
  );

  useEffect(() => {
    if (!isRead && myMessage) {
      const url = new URL(process.env.REACT_APP_MERCURE_PUBLIC_URL);
      url.searchParams.append("topic", `http://monsite.com/message/${id}`);
      const eventSource = new EventSource(url);
      eventSource.onmessage = () => {
        setIsReadState(true);
      };
    }
  }, []);

  return (
    <div
      className={classNames(
        "flex w-full justify-start mt-1",
        {
          "!justify-end pl-8": myMessage,
        },
        { "pr-8": !myMessage }
      )}
    >
      <div
        className={classNames(
          "p-2 rounded-xl text-sm text-white bg-gray-500 flex flex-col items-end md:max-w-[500px]",
          {
            "!bg-blue-700": myMessage,
          }
        )}
      >
        <div className="w-full flex items-start">
          <p>{content}</p>
        </div>
        <span className="ml-4 text-[10px] text-gray-300">
          <span>{moment(new Date(createdAt)).format("DD/MM/YYYY hh:mm")}</span>{" "}
          {(isRead || isReadState) && myMessage && <span>vu</span>}
        </span>
      </div>
    </div>
  );
};

export default MessageItem;
