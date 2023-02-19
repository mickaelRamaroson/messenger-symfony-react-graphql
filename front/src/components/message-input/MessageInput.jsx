import { Send } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { sendMessage } from "../../store/slice/threadSlice";

const autoGrow = (element) => {
  element.style.height = "5px";
  element.style.height = element.scrollHeight + "px";
};

const MessageInput = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setValue(e.target.value);
    autoGrow(e.target);
  };

  const handleClickSend = async () => {
    setValue("");
    if (value.length) {
      dispatch(sendMessage(value.trim()));
    }
  };

  return (
    <div className="w-full px-4 py-2 flex items-center">
      <textarea
        value={value}
        onChange={handleChange}
        className="w-full resize-none min-h-[48px] bg-gray-700 overflow-hidden p-2 focus:outline-none rounded-lg"
      />
      <IconButton onClick={handleClickSend}>
        <Send fontSize="large" color="primary" />
      </IconButton>
    </div>
  );
};

export default MessageInput;
