import { createContext, useContext, useState } from "react";
import { loginUser, signUpUser } from "../helpers/api-communicators";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (username, password) => {
    const data = await loginUser(username, password);
    if (data) {
      // console.log(data);
      sessionStorage.setItem("username", data.username);
      sessionStorage.setItem("userId", data.userId);
      sessionStorage.setItem("token", data.token);
      setUser({
        username: data.username,
        userId: data.userId,
        token: data.token,
      });
      setIsLoggedIn(true);
    }
  };
  const signup = async (username, email, password, phone) => {
    const data = await signUpUser(username, email, password, phone);
    if (data) {
      return true;
    } else {
      return false;
    }
  };
  const value = {
    user,
    isLoggedIn,
    login,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
