/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMyThreads } from "../../store/slice/threadSlice";

const Discussions = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getMyThreads());
  }, []);

  return <></>;
};

export default Discussions;
