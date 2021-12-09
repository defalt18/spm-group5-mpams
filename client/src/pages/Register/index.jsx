import React, { useState } from "react";
import Page from "components/Page";
import c from "classnames";
import { useUserContext } from "hooks/useUser";
import { Avatar } from "@mui/material";
import avatar from "assets/images/avatar_user.png";
import avatar_pro from "assets/images/avatar_professional.png";
import Professional from "./components/Professional";
import UserForm from "./components/User";
import _map from "lodash/map";
import { useToggle } from "react-use";
import Loader from "../../components/Loader";

const avatarStyles = {
  height: 130,
  width: 130,
};

const USER_TYPES = [
  {
    label: "User",
    image: avatar,
    type: 0,
  },
  {
    label: "Professional",
    image: avatar_pro,
    type: 1,
  },
];

function Register() {
  const context = useUserContext();
  const uiLoader = useToggle(false);
  const [loading, _] = uiLoader;
  const [accountType, setType] = useState(0);

  if (loading)
    return (
      <Loader
        className="h-screen w-screen grid place-items-center"
        type="bird"
      />
    );

  return (
    <Page className="grid place-items-center bg-gray-800">
      <div className="w-7/12 bg-white rounded-2xl p-4 flex flex-col items-center h-4/6 overflow-scroll">
        <div className="w-full mb-3">
          <p className="text-gray-800 text-lg">
            Hello <span className="font-bold">{context.user?.name}</span>, let's
            know more about you!
          </p>
        </div>
        <div className="w-full my-3 flex justify-evenly items-center">
          {_map(USER_TYPES, (user) => (
            <button
              key={user.label}
              className={c(
                "flex flex-col items-center p-2 px-4 hover:bg-blue-50 rounded gap-y-3",
                accountType === user.type ? "bg-blue-50" : ""
              )}
              onClick={() => setType(user.type)}
            >
              <Avatar src={user.image} style={avatarStyles} />
              <p>{user.label}</p>
            </button>
          ))}
        </div>
        {accountType ? (
          <Professional context={context} uiLoader={uiLoader} />
        ) : (
          <UserForm context={context} uiLoader={uiLoader} />
        )}
      </div>
    </Page>
  );
}

export default Register;
