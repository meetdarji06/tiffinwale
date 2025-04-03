import React from "react";
import { Navigate } from "react-router-dom";
import Loading from "./Loading";
import { useAuth } from "@/context/authContext";

function AdminRoutes({ children }) {
  const { user, loading } = useAuth();
  //   const navigate = useNavigate();

  if (loading) return <Loading />;

  return user && user.role === "ADMIN" ? children : <Navigate to={"/"} />;
}

export default AdminRoutes;
