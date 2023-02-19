import classNames from "classnames";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

const MessageItem = ({ id, content, createdAt, isRead, user }) => {
  const { currentUser } = useSelector((state) => state.auth);

  const myMessage = useMemo(
    () => user.id === currentUser.id,
    [user, currentUser]
  );

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
          {moment(new Date(createdAt)).format("DD/MM/YYYY hh:mm")}
        </span>
      </div>
    </div>
  );
};

export default MessageItem;
