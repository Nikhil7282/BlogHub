import React, { useEffect, useState } from "react";
import { HiCubeTransparent } from "react-icons/hi";
import { IoReorderThree } from "react-icons/io5"
import { IoSearch } from "react-icons/io5";
import "../App.css";
import { Outlet, useNavigate } from "react-router-dom";
import SearchBar from "./Search/SearchBar";

function NewNavbar({ state }) {
  const navigate=useNavigate()
  const [showLinks, setShowLinks] = useState(false);
  const [showSearch,setShowSearch]=useState(false)
  useEffect(()=>{
    if(window.location.pathname === "/user/dashboard"){
      setShowSearch(true)
    }
  })
  const logout=async()=>{
    await sessionStorage.clear()
    navigate('/login')
  }
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
              <div className="links" id={showLinks?"hidden":""}>
                <a style={{display:showLinks?"none":""}}>
                  <HiCubeTransparent className="icon" />
                </a>
                <a href="/user/dashboard">BlogHub</a>
                <a href="/user/addpost">Add Post</a>
                <a href="/user/userpost">My Post</a>
                <a onClick={logout}>Logout</a>
              </div>
              <button onClick={()=>{setShowLinks(!showLinks)}}><IoReorderThree/></button>
            </div>
            <div className="rightSide" style={{display:showSearch?"":"none"}}>
              <SearchBar/>
              {/* <input type="text" placeholder="Search" />
              <button><IoSearch/></button> */}
            </div>
          </div>
          <Outlet />
        </div>
      )}
    </div>
  );
}

export default NewNavbar;
