import cx from "classnames";
import { Add } from "@mui/icons-material";

const CreateNewDiscussionBtn = ({ onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={cx(
        "rounded-full bg-blue-500 hover:bg-blue-600 p-4",
        className
      )}
    >
      <Add fontSize="large" />
    </button>
  );
};

export default CreateNewDiscussionBtn;
