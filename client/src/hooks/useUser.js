import React, { useState } from "react";
import { UserContext } from "../context";

export default function useDefaultUser() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user-token"))
  );

  return { user, setUser };
}

export const useUserContext = () => {
  return React.useContext(UserContext);
};
