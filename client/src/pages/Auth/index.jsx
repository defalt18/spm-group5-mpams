import React, { useCallback } from "react";
import googleLogo from "assets/images/google_logo.png";
import { useHistory } from "react-router-dom";
import { DASHBOARD, FIRST_LOGIN } from "routes";
import Page from "components/Page";
import { useLogin, useUserContext } from "hooks/useUser";
import { CircularProgress } from "@mui/material";
import { getUser } from "utils";
import { useToggle } from "react-use";
import Loader from "components/Loader";
import Header from "./components/Header";

function Auth() {
  const history = useHistory();
  const { setUser } = useUserContext();
  const { signIn } = useLogin();
  const [loading, toggleLoading] = useToggle(false);

  const onClick = useCallback(async () => {
    toggleLoading();
    const user = (await signIn())?.profileObj;
    const result = await getUser(user).catch((err) => alert(err.message));
    setUser({
      ...result,
      name: user.name,
      photo: user.imageUrl,
      description: "",
    });
    if (result.accountType === -1) history.push(FIRST_LOGIN);
    else history.push(DASHBOARD);
  }, [history, signIn, setUser, toggleLoading]);

  if (loading)
    return (
      <Loader
        className="h-screen w-screen grid place-items-center bg-gray-600"
        type="bird"
      />
    );

  return (
    <Page className="bg-gray-300 text-white relative home-gradient flex">
      <Header />
      <div className="m-auto rounded-3xl p-8 bg-black bg-opacity-20 text-white flex flex-col items-center w-4/12">
        <p className="font-bold text-2xl mb-4">Log in to your account</p>
        <p className="mb-4 text-center">
          This is an appointment scheduling portal for professionals and
          everyday users.
          <br />
          <br />
          Hop in and explore!
        </p>
        <button
          className="flex items-center w-72 rounded-xl p-2 px-3 bg-black bg-opacity-40 transition-all duration-200 ease-in-out hover:bg-opacity-60"
          disabled={loading}
          onClick={onClick}
        >
          {loading ? (
            <CircularProgress
              className="mx-auto"
              style={{
                height: 25,
                width: 25,
                color: "white",
              }}
            />
          ) : (
            <>
              <img className="h-5 w-5" src={googleLogo} />
              <div className="flex-1 flex">
                <p className="m-auto text-white">Log in with Google</p>
              </div>
            </>
          )}
        </button>
      </div>
    </Page>
  );
}

export default React.memo(Auth);
