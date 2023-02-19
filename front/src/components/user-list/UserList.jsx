/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getRandomColor from "../../helpers/generatorColorRamdom";
import {
  createThread,
  getCurrentThreadById,
  threadSliceActions,
} from "../../store/slice/threadSlice";
import { getUsers } from "../../store/slice/userSlice";

const UserList = ({ open, onClose }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const { threads } = useSelector((state) => state.thread);
  const { users, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleClickUser = async (id) => {
    const userThread = (threads || []).find(({ participants }) =>
      (participants || []).map((el) => el.id).includes(id)
    );

    // if thread with this user exists, we go the this thread
    if (userThread) {
      dispatch(
        threadSliceActions.setCurrentInterlocuteur(
          userThread.participants.find((item) => item.id === id)
        )
      );
      dispatch(getCurrentThreadById(userThread.id));
    } else {
      dispatch(createThread(id));
    }
    onClose && onClose();
  };

  useEffect(() => {
    if (open) dispatch(getUsers());
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <DialogTitle>Vos contacts</DialogTitle>
      <DialogContent>
        {loading && (
          <p className="font-semibold text-base">Chargement en cours...</p>
        )}
        <div className="min-w-[340px] overflow-y-auto max-h-[500px]">
          {(users || [])
            .filter(({ id }) => id !== currentUser.id)
            .map(({ id, email, firstname }) => (
              <div
                key={id}
                className="flex items-center  cursor-pointer hover:bg-gray-200 px-4 py-2 rounded-md"
                onClick={() => handleClickUser(id)}
              >
                <Avatar sx={{ bgcolor: getRandomColor() }}>
                  {firstname.charAt(0)}
                </Avatar>
                <div className="ml-4 flex flex-col">
                  <span className="text-sm">{firstname}</span>
                  <span className="text-xs text-gray-400 italic">{email}</span>
                </div>
              </div>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserList;
