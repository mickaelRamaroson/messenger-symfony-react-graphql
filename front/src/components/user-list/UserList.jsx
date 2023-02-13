/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../store/slice/userSlice";

const UserList = ({ open, onClose }) => {
  const { users } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (open) dispatch(getUsers());
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <DialogTitle>Vos contacts</DialogTitle>
      <DialogContent>
        <div className="min-w-[340px] overflow-y-auto max-h-[500px]">
          {(users || []).map(({ id, lastname, email }) => (
            <div
              key={id}
              className="flex items-center  cursor-pointer hover:bg-gray-200 px-4 py-2 rounded-md"
            >
              <Avatar>{lastname.charAt(0)}</Avatar>
              <div className="ml-4 flex flex-col">
                <span className="text-sm">{lastname}</span>
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
