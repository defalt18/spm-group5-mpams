import React, { useCallback, useState } from "react";
import Page from "components/Page";
import { useHistory } from "react-router-dom";
import { DASHBOARD } from "routes";
import c from "classnames";
import { useToggle } from "react-use";
import { setUser } from "utils";
import { useUserContext } from "hooks/useUser";

const Input = React.memo(({ label, ...rest }) => {
  const [active, toggle] = useToggle(false);
  return (
    <div className="mb-3 w-full">
      <p className="mb-3">{label}</p>
      <input
        {...rest}
        className={c(
          "w-full outline-none p-2 rounded",
          active ? "bg-gray-100" : "bg-gray-200"
        )}
        onBlur={toggle}
        onFocus={toggle}
      />
    </div>
  );
});

function Register() {
  const history = useHistory();
  const { setUser: setContextValue } = useUserContext();
  const [userDetails, setDetails] = useState(() => ({
    name: "",
    email: "",
    address: "",
    phone: "",
    profession: "",
  }));

  const onClick = useCallback(async () => {
    history.push(DASHBOARD);
    await setUser(setContextValue, userDetails);
  }, [history, setContextValue, userDetails]);

  const handleChange = useCallback(
    (_event) => {
      const { name, value } = _event.target;
      setDetails({ ...userDetails, [name]: value });
    },
    [userDetails, setDetails]
  );

  return (
    <Page className="grid place-items-center bg-gray-800">
      <div className="w-7/12 bg-white rounded-2xl p-4 flex flex-col items-center">
        <div className="w-full mb-3">
          <p className="text-gray-800 text-lg">
            Hello <span className="font-bold">username</span>, let's know more
            about you!
          </p>
        </div>
        <Input
          label="Email"
          name="email"
          placeholder="xyz@example.com"
          type="email"
          value={userDetails.email}
          onChange={handleChange}
        />
        <Input
          label="Name"
          name="name"
          placeholder="John Doe"
          value={userDetails.name}
          onChange={handleChange}
        />
        <Input
          label="Profession"
          name="profession"
          placeholder="Doctor, Engineer..."
          value={userDetails.profession}
          onChange={handleChange}
        />
        <Input
          label="Address"
          name="address"
          placeholder="Cupertino"
          value={userDetails.address}
          onChange={handleChange}
        />
        <Input
          label="Mobile No'"
          name="phone"
          placeholder="+1 224 23423423"
          type="number"
          value={userDetails.phone}
          onChange={handleChange}
        />
        <button
          className="bg-green-400 text-white font-bold p-2 px-4 rounded-xl outline-none"
          onClick={onClick}
        >
          Register
        </button>
      </div>
    </Page>
  );
}

export default Register;
