import { createBrowserRouter } from "react-router";
import AuthenticationForm from "./auth/AuthenticationForm";
import Home from "./home/Home";
import FrontPage from "./FrontPage"; // Ensure correct path
import Encrypt from "./home/Encrypt";
import Decrypt from "./home/Decrypt";
import { Navigate } from "react-router";

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("token"); // Check if token exists
  return token ? element : <Navigate to="/auth" />;
};

const UnprotectedRoute = ({ element }) => {
  const token = localStorage.getItem("token"); // Check if token exists
  return token ? <Navigate to="/home" /> : element;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <FrontPage />, // Correctly render FrontPage here
  },
  {
    path: "/auth",
    element: <UnprotectedRoute element={<AuthenticationForm />} />,
  },
  {
    path: "/home",
    element: <ProtectedRoute element={<Home />} />,
    children: [
      {
        path: "",
        index: true,
        element: <Encrypt />,
      },
      {
        path: "decrypt",
        element: <Decrypt />,
      },
    ],
  },
]);

export default router;
