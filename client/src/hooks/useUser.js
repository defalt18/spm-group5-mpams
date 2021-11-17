import React, { useState } from "react";
import { UserContext } from "../context";

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
