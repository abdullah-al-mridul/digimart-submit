import React, { useEffect, useState } from "react";
import authStore from "../store/authStore";
import { Navigate } from "react-router-dom";

const SecureRoute = ({ children }) => {
  const { user } = authStore();

  console.log("user", user);
  if (!user) return <Navigate to={"/login"} replace />;
  if (!user.isVerified) return <Navigate to={"/verify-email"} replace />;
  if (user) children;
  return children;
};

export default SecureRoute;
