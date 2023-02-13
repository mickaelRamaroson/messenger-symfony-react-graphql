/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login"); // redirection to the /login
    }
  }, [token]);

  return children;
};

export default AuthGuard;
