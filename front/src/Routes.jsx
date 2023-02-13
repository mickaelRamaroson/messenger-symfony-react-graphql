import { useRoutes } from "react-router-dom";
import AuthGuard from "./components/auth-guard";
import Loginpage from "./pages/LoginPage";
import MessengerPage from "./pages/MessengerPage";
import RegistrationPage from "./pages/RegistrationPage";

const Routes = () => {
  const element = useRoutes([
    {
      path: "/",
      element: (
        <AuthGuard>
          <MessengerPage />
        </AuthGuard>
      ),
    },
    {
      path: "/login",
      element: <Loginpage />,
    },
    {
      path: "/registration",
      element: <RegistrationPage />,
    },
  ]);

  return element;
};

export default Routes;
