export const setUser = async (registerUser, User) => {
  registerUser(User);
  localStorage.setItem("user-token", JSON.stringify(User));
};

export const logoutUser = async (setUserStatus) => {
  setUserStatus(null);
  localStorage.clear();
};
