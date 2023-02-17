import { useState } from "react";
import CreateNewDiscussionBtn from "../components/create-new-discussion-btn";
import AvatarUser from "../components/user-avatar";
import UserList from "../components/user-list";
import Discussions from "../components/discussions";

const MessengerPage = () => {
  const [openUserList, setOpenUserList] = useState(false);

  const handleClickOnCreateNewDiscussion = () => {
    setOpenUserList(true);
  };

  return (
    <>
      <UserList open={openUserList} onClose={() => setOpenUserList(false)} />
      <div className="w-screen h-screen bg-gray-800 flex ">
        <div className="w-full md:w-1/3 h-full max-h-screen border-r border-gray-600 relative overflow-y-auto">
          <div className="bg-gray-800 sticky top-0 w-full">
            <div className="p-4 bg-gray-700">
              <AvatarUser />
            </div>
            <h2 className="font-poppins font-semibold text-xl p-4">
              Vos discusions :
            </h2>
          </div>
          <Discussions />
          <CreateNewDiscussionBtn
            onClick={handleClickOnCreateNewDiscussion}
            className="absolute bottom-6 right-6"
          />
        </div>
        <div className="hidden md:block w-full md:w-2/3 h-full">
          <div className="w-full p-6 border-b border-gray-600"></div>
        </div>
      </div>
    </>
  );
};
export default MessengerPage;
