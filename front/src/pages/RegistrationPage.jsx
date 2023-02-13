/* eslint-disable react-hooks/exhaustive-deps */
import { Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { authActions, registration } from "../store/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const registrationSchema = yup.object().shape({
  firstname: yup.string().required("Champ obligatoire."),
  lastname: yup.string().required("Champ obligatoire."),
  email: yup
    .string()
    .email("Ce n'est pas une adresse email valide.")
    .required("Champ obligatoire."),
  password: yup
    .string()
    .min(8, "Minimum 8 caractères")
    .max(64, "Maximum 64 caractères")
    .required("Champ obligatoire."),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Les mots de passe ne correspondent pas."
    )
    .required("Champ obligatoire."),
});

const RegistrationPage = () => {
  const { loading, error: errorEmail } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const { payload } = await dispatch(registration(values));
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
        <h1 className="font-semibold text-2xl text-gray-700">
          Créer un nouveau compte
        </h1>
        <Formik
          initialValues={{
            lastname: "",
            firstname: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={registrationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isValid,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="mt-4 w-full">
                <TextField
                  label="Nom*"
                  fullWidth
                  name="lastname"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastname}
                />
                {touched.lastname && errors.lastname && (
                  <span className="msg-error">{errors.lastname}</span>
                )}
              </div>
              <div className="mt-4 w-full">
                <TextField
                  label="Prénom*"
                  fullWidth
                  name="firstname"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstname}
                />
                {touched.firstname && errors.firstname && (
                  <span className="msg-error">{errors.firstname}</span>
                )}
              </div>
              <div className="mt-4 w-full">
                <TextField
                  label="Adresse e-mail*"
                  type="email"
                  name="email"
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {errorEmail && <span className="msg-error">{errorEmail}</span>}
                {touched.email && errors.email && (
                  <span className="msg-error">{errors.email}</span>
                )}
              </div>
              <div className="mt-4 w-full">
                <TextField
                  label="Mot de passe*"
                  type="password"
                  fullWidth
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {touched.password && errors.password && (
                  <span className="msg-error">{errors.password}</span>
                )}
              </div>
              <div className="mt-4 w-full">
                <TextField
                  label="Confirmation du mot de passe*"
                  type="password"
                  name="confirmPassword"
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword || ""}
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <span className="msg-error">{errors.confirmPassword}</span>
                )}
              </div>
              <div className="mt-4 w-full">
                <Button
                  disabled={!isValid || loading}
                  type="submit"
                  size="large"
                  fullWidth
                  variant="contained"
                >
                  {loading ? "Sauvegarde en cours..." : "Enregister"}
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegistrationPage;
