import { createBrowserRouter } from "react-router";
import AuthenticationForm from "./auth/AuthenticationForm";
import Home from "./home/Home";
import Encrypt from "./home/Encrypt";
import Decrypt from "./home/Decrypt";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthenticationForm />,
  },
  {
    path: "/home",
    element: <Home />,
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
