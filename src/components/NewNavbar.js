import React, { Suspense, useEffect, useState } from "react";
import { HiCubeTransparent } from "react-icons/hi";
import { IoReorderThree, IoClose } from "react-icons/io5";
import "../App.css";
import { Outlet, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import BreadCrumbs from "./BreadCrumbs";

function NewNavbar({ state }) {
  const navigate = useNavigate();
  const [showLinks, setShowLinks] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  useEffect(() => {
    if (window.location.pathname === "/user/dashboard") {
      setShowSearch(true);
    }
  });
  const logout = async () => {
    await sessionStorage.clear();
    navigate("/login");
  };
  return (
    <div>
      {state === "Home" ? (
        <div className="navbar">
          <div className="home-leftSide">
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
              <div className="links" id={showLinks ? "hidden" : "show"}>
                <a style={{ display: showLinks ? "none" : "" }}>
                  <HiCubeTransparent className="icon" />
                </a>
                <a href="/user/dashboard">BlogHub</a>
                <a href="/user/addpost">Add Post</a>
                <a href="/user/userpost">My Post</a>
                <a href="/user/savedPosts">Saved</a>
                {/* <a onClick={logout} className="logoutSpan">
                  Logout
                </a> */}
              </div>
              <button
                onClick={() => {
                  setShowLinks(!showLinks);
                }}
              >
                {showLinks ? <IoClose /> : <IoReorderThree />}
              </button>
            </div>
            <div
              className="rightSide"
              style={{ display: showSearch ? "" : "none" }}
            >
              <SearchBar />
              <a onClick={logout} className="logoutSpan">
                Logout
              </a>
            </div>
          </div>
          <BreadCrumbs />
          <Outlet />
        </div>
      )}
    </div>
  );
}

export default NewNavbar;
