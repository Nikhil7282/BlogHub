import React, { useState } from "react";
import { HiCubeTransparent } from "react-icons/hi";
import "../App.css";
import { Outlet } from "react-router-dom";

function NewNavbar({ state }) {
  const [showLinks, setShowLinks] = useState(false);
  return (
    <div>
      {state === "Home" ? (
        <div className="navbar">
          <div className="leftSide">
            <div className="links">
              <a href="/">
                <HiCubeTransparent className="icon" />
              </a>
              <a href="/">BlogHub</a>
            </div>
          </div>
          <div className="rightSide">
            <div className="links">
              <a href="/login">Login</a>
              <a href="/register">SignUp</a>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="navbar">
            <div className="leftSide">
              <div className="links" id={showLinks?"hidden":""}>
                <a>
                  <HiCubeTransparent className="icon" />
                </a>
                <a href="/user/dashboard">BlogHub</a>
                <a href="/user/addpost">Add Post</a>
                <a href="/user/userpost">My Post</a>
                <a>Logout</a>
              </div>
              <button onClick={()=>{setShowLinks(!showLinks)}}>open</button>
            </div>
            <div className="rightSide">
              <input type="text" placeholder="Search" />
              <button>Search</button>
            </div>
          </div>
          <Outlet />
        </div>
      )}
    </div>
  );
}

export default NewNavbar;
