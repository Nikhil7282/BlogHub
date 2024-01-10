import React from 'react'
import { Navigate } from "react-router-dom";

function PublicRoute({children}) {
  if(sessionStorage.getItem("token")){
    return <Navigate to="/user/dashboard"/>
  }
  else{
    return children
  }
}

export default PublicRoute