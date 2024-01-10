import axios from "axios";
import { url } from "../App";

export const loginUser = async (username, password) => {
  const res = await axios.post(`${url}/users/login`, { username, password });
  if (res.status !== 200) {
    throw new Error("Unable to login");
  }
  const data = await res.data;
  return data;
};
export const signUpUser = async (username, email, password, phone) => {
  const res = await axios.post(`${url}/users/signup`, {
    username,
    email,
    password,
    phone,
  });
  if (res.status !== 201) {
    throw new Error("Unable to signup");
  }
  const data = await res.data;
  return data;
};
