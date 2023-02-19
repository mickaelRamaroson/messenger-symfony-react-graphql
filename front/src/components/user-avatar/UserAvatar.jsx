import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";

const AvatarUser = () => {
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <div className="flex items-center cursor-pointer">
      <Avatar />
      <div className="ml-4 font-semibold text-lg">{currentUser?.firstname}</div>
    </div>
  );
};

export default AvatarUser;
