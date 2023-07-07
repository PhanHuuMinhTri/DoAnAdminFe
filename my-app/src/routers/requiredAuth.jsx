import React from "react";
import { Navigate } from "react-router-dom";

export const RequiredAuth = ({ children }) => {
  const isLogin = localStorage.getItem("isLoginAdmin");

  return <>{isLogin ? <Navigate to={"/user"} /> : children}</>;
};

export const ProtectedRoutes = ({ children }) => {
  const isLogin = localStorage.getItem("isLoginAdmin");

  return <>{isLogin ? children : <Navigate to={"/"} />}</>;
};
