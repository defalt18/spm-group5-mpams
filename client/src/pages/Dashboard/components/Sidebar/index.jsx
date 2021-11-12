import React, { useCallback } from "react";
import _map from "lodash/map";
import _keys from "lodash/keys";
import c from "classnames";
import { VIEWS } from "../../dashboard-model";
import Avatar from "@mui/material/Avatar";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useToggle } from "react-use";
import { CircularProgress } from "@mui/material";
import { logoutUser } from "utils";
import { useHistory } from "react-router-dom";
import { AUTH } from "routes";

const avatarStyle = {
  bgcolor: "#2d3440",
};
const loaderStyles = { color: "white", height: 20, width: 20 };

const SidebarItem = React.memo((props) => {
  const { label, id, toggleView, view } = props;
  const toggle = useCallback(() => toggleView(id), [toggleView, id]);
  return (
    <button
      className={c(
        "w-full text-left text-lg font-bold truncate hover:bg-white hover:bg-opacity-10 hover:text-white p-2 transition-all duration-200 rounded",
        view === id ? "text-white" : "text-gray-500"
      )}
      onClick={toggle}
    >
      {label}
    </button>
  );
});

function Sidebar(props) {
  const { user, setUser, ...rest } = props;
  const history = useHistory();
  const [loading, toggleLoading] = useToggle(false);

  const onLogout = useCallback(async () => {
    toggleLoading();
    await logoutUser(setUser);
    toggleLoading();
    history.push(AUTH);
  }, [toggleLoading, history, setUser]);

  return (
    <div className="w-3/12 bg-gray-800 text-white shadow-2xl py-8 px-8 font-bold text-2xl flex flex-col">
      <div className="p-2 flex gap-2 items-center flex-wrap flex-col">
        <Avatar className="text-white" sx={avatarStyle}>
          {user.name[0]}
        </Avatar>
        <div className="flex flex-col font-normal text-center">
          <span className="text-base text-white truncate">{user.name}</span>
          <span className="text-base text-gray-400 truncate">{user.email}</span>
        </div>
      </div>
      <div className="flex w-full flex-col gap-y-3 mt-8">
        {_map(_keys(VIEWS), (key) => (
          <SidebarItem id={key.toUpperCase()} label={key} {...rest} />
        ))}
      </div>
      <button
        className="w-full mt-auto flex gap-x-2 items-center group text-gray-500 text-left text-lg hover:bg-white hover:bg-opacity-10 hover:text-white p-2 transition-all duration-200 rounded"
        onClick={onLogout}
      >
        <LogoutRoundedIcon />
        <span>Logout</span>
        {loading && (
          <CircularProgress className="ml-auto" style={loaderStyles} />
        )}
      </button>
    </div>
  );
}

export default React.memo(Sidebar);
