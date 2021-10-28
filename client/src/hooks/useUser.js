import { useState, useContext } from "react";

export default function useUser() {
  const authUser = useContext();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user-token"))
  );

  return { user };
}
