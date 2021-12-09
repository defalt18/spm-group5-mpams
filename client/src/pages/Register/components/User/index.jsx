import React, { useCallback, useState } from "react";
import { Input } from "../Input";
import { registerUser } from "utils";
import { useHistory } from "react-router-dom";
import { DASHBOARD } from "routes";

function UserForm(props) {
  const { context, uiLoader } = props;
  const { user, setUser } = context;
  const [_, toggleLoading] = uiLoader;
  const history = useHistory();
  const [userDetails, setDetails] = useState({ ...user, accountType: 0 });
  const handleChange = useCallback(
    (_event) => {
      const { name, value } = _event.target;
      setDetails({ ...userDetails, [name]: value });
    },
    [userDetails, setDetails]
  );

  const onClick = useCallback(async () => {
    toggleLoading();
    const { address, ...userdata } = userDetails;
    const result = await registerUser(userdata);
    setUser({ ...userDetails, ...result });
    history.push(DASHBOARD);
    toggleLoading();
  }, [userDetails, history, setUser, toggleLoading]);

  return (
    <>
      <Input
        label="Address"
        name="address"
        placeholder="Cupertino"
        value={userDetails.address}
        onChange={handleChange}
      />
      <Input
        label="Mobile No'"
        name="mobileNo"
        placeholder="+1 224 23423423"
        type="number"
        value={userDetails.phone}
        onChange={handleChange}
      />
      <button
        className="bg-green-400 text-white mt-auto font-bold p-2 px-4 rounded-xl outline-none"
        onClick={onClick}
      >
        Register
      </button>
    </>
  );
}

export default UserForm;
