import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const accessToken = localStorage.getItem("accessToken");
  const username = localStorage.getItem("username");
  const image = localStorage.getItem("image");
  const email = localStorage.getItem("email");
  const name = localStorage.getItem("name");
  return accessToken && username && image && email && name ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
