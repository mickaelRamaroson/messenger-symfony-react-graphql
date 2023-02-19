/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions, login } from "../store/slice/authSlice";
import { Link } from "react-router-dom";

const Loginpage = () => {
  const { loading, error } = useSelector((state) => state.auth);
  const [value, setValue] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValue((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { payload } = await dispatch(login(value));
    if (payload) {
      navigate("/");
    }
  };
  useEffect(() => {
    dispatch(authActions.setError(null));
  }, []);

  return (
    <div className="auth-page">
      <div className="form-container">
        <h1 className="font-semibold text-2xl text-gray-700">Login</h1>
        {error && <p className="text-red-500 text-base">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <TextField
              label="Adresse e-mail"
              type="email"
              required
              fullWidth
              value={value.email}
              onChange={handleChange}
              name="email"
            />
          </div>
          <div className="mt-4">
            <TextField
              label="Mot de passe"
              type="password"
              required
              fullWidth
              name="password"
              value={value.password}
              onChange={handleChange}
            />
          </div>
          <div className="mt-4">
            <Button
              disabled={loading}
              type="submit"
              size="large"
              fullWidth
              variant="contained"
            >
              login
            </Button>
          </div>
          <Link
            to="/registration"
            className="text-blue-500 hover:text-blue-600 cursor-pointer"
          >
            Créer un nouveau compte
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Loginpage;
