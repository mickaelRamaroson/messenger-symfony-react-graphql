import { Avatar } from "@mui/material";

const DiscussionItem = () => {
  return (
    <div className="p-4 flex">
      <Avatar>U</Avatar>
      <div className="ml-4">
        <p className="username">User</p>
        <p className="last-message"></p>
      </div>
    </div>
  );
};

export default DiscussionItem;
