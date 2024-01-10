import React from 'react'
import { Navigate } from "react-router-dom";


function ProtectedRoute({children}) {
    if (sessionStorage.getItem("token")) {
        return children;
      } else {
        return <Navigate to="/login" />;
      }
}

export default ProtectedRoute