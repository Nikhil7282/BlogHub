import React from "react";
import { HiCubeTransparent } from "react-icons/hi";
import "../App.css";

function NewNavbar({state}) {
  return (
    <div>
      {
        state === "Home" ? (
            <div className="navbar">
                <div className="leftSide">
            <div className="links">
              <a>
                <HiCubeTransparent className="icon"/>
              </a>
              <a>BlogHub</a>
            </div>
          </div>
          <div className="rightSide">
                <div className="links">
                <a href="/login">Login</a>
              <a href="/register">SignUp</a>
                </div>
          </div>
            </div>
          ):(
            <div className="navbar">
                <div className="leftSide">
            <div className="links">
              <a>
                <HiCubeTransparent />
              </a>
              <a href="/login">Dashboard</a>
              <a href="/">Add Post</a>
              <a href="">My Post</a>
              <a>Logout</a>
            </div>
          </div>
          <div className="rightSide">
            <input type="text" placeholder="Search"/>
            <button>Search</button>
          </div>
        </div>
          )
      }
    </div>
  );
}

export default NewNavbar;
