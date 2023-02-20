import { useState } from "react";
import CreateNewDiscussionBtn from "../components/create-new-discussion-btn";
import AvatarUser from "../components/user-avatar";
import UserList from "../components/user-list";
import Discussions from "../components/discussions";
import Messages from "../components/messages";
import { IconButton } from "@mui/material";
import { PowerSettingsNew } from "@mui/icons-material";

const MessengerPage = () => {
  const [openUserList, setOpenUserList] = useState(false);

  const handleClickOnCreateNewDiscussion = () => {
    setOpenUserList(true);
  };

  const handleClickLogout = () => {
    localStorage.clear();
    setTimeout(() => {
      window.location.assign("/login");
    }, 1000);
  };

  return (
    <>
      <UserList open={openUserList} onClose={() => setOpenUserList(false)} />
      <div className="w-screen h-screen bg-gray-800 flex ">
        <div className="h-full w-1/3 border-r border-gray-600 relative flex flex-col">
          <CreateNewDiscussionBtn
            onClick={handleClickOnCreateNewDiscussion}
            className="absolute bottom-6 right-6"
          />
          <div className="bg-gray-800 w-full ">
            <div className="p-4 bg-gray-700 w-full flex items-center justify-between">
              <AvatarUser />
              <IconButton onClick={handleClickLogout}>
                <PowerSettingsNew color="error" />
              </IconButton>
            </div>
            <h2 className="font-poppins font-semibold text-xl p-4">
              Vos discusions :
            </h2>
          </div>
          <div className="grow overflow-y-auto">
            <Discussions />
          </div>
        </div>
        <div className="w-2/3 h-full">
          <Messages />
        </div>
      </div>
    </>
  );
};
export default MessengerPage;
