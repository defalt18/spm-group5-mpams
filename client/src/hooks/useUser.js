import React, { useState } from "react";
import { UserContext } from "../context";
import { useGoogleLogin } from "react-use-googlelogin";

export default function useDefaultUser() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user-token"))
  );

  const updateUser = (newUser) => {
    setUser(newUser);
    localStorage.setItem("user-token", JSON.stringify(newUser));
  };

  return { user, setUser: updateUser };
}

export const useUserContext = () => {
  return React.useContext(UserContext);
};

export const useLogin = () => {
  return useGoogleLogin({
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    cookiePolicy: "single_host_origin",
  });
};
