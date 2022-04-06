import jwtDecode from "jwt-decode";

import { authHost, host } from "./index";
import { IUser } from "../interfaces/IUser";

export const registration = async (
  displayName: string,
  age: number,
  email: string,
  password: string,
) => {
  const { data } = await host.post("auth/signup", {
    displayName,
    age,
    email,
    password,
  });
  localStorage.setItem("token", data);
  return jwtDecode(data);
};

export const login = async (email: string, password: string) => {
  const { data } = await host.post("auth/signin", { email, password });
  localStorage.setItem("token", data);
  let user: IUser = {
    id: 0,
    displayName: "",
    email: "",
    password: "",
    age: 0,
    role: "",
    isActivated: false,
    activationLink: "",
  };
  user = jwtDecode(data);
  return user;
};

export const authCheck = async () => {
  const data = localStorage.getItem("token");
  if (data != null) {
    localStorage.setItem("token", data);
  }
  let user: IUser = {
    id: 0,
    displayName: "",
    email: "",
    password: "",
    age: 0,
    role: "",
    isActivated: false,
    activationLink: "",
  };
  if (typeof data === "string") {
    user = jwtDecode(data);
  }
  return user;
};

export const resetToken = () => {
  localStorage.setItem("token", "");
  return "";
};

export const fetchOneUser = async (id: string | undefined) => {
  const { data } = await authHost.get(`auth/viewUser/${id}`);
  return data;
};
