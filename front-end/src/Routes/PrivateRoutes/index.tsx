import { useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = () => {
  const token = () => localStorage.getItem("accesToken");
  const location = useLocation();

  return !!token() ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};
