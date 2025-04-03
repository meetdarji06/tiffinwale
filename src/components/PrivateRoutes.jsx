import { useAuth } from "@/context/authContext";
import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Loading from "./Loading";

function PrivateRoutes({ children }) {
  const { user, loading } = useAuth();
  //   const navigate = useNavigate();

  if (loading) return <Loading />;

  return user ? children : <Navigate to={"/login"} />;
}

export default PrivateRoutes;
