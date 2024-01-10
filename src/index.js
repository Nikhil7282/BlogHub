// import './axios/global'
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PostProvider from "./context/globalContext";
import { AuthProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <AuthProvider>
      <PostProvider>
    <Router>
      <ToastContainer position="top-right"/>
      <App />
    </Router>
    </PostProvider>
    </AuthProvider>
  // </React.StrictMode>
);
