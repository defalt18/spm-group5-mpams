import React, { useCallback, useState } from "react";
import { Input } from "../Input";
import Select from "components/Select";
import _map from "lodash/map";
import WorkspaceCard from "../WorkspaceCard";
import { addWorkspaces, registerUser } from "../../../../utils";
import { DASHBOARD } from "../../../../routes";
import { useHistory } from "react-router-dom";

function Professional(props) {
  const { context, uiLoader } = props;
  const { user, setUser: setContext } = context;
  const [_, toggleLoading] = uiLoader;
  const history = useHistory();
  const [userDetails, setDetails] = useState({
    ...user,
    accountType: 1,
    description: "",
  });
  const [workspaces, setWorkspaces] = useState([]);
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
    const mongoUser = await registerUser(userdata);
    const wsIDs = await addWorkspaces(workspaces, mongoUser.data);
    setContext({
      ...userDetails,
      ...mongoUser,
      workspaceInfo: wsIDs,
    });
    history.push(DASHBOARD);
    toggleLoading();
  }, [userDetails, workspaces, history, setContext, toggleLoading]);

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

      <p className="mb-3 w-full">Profession</p>
      <Select
        borderRadius="0.25rem"
        className="w-full mb-3"
        handleChange={handleChange}
        name="profession"
        prefix=""
        showCaption={false}
      />
      <p className="mb-3 w-full">Description</p>
      <div className="w-full">
        <textarea
          className="bg-gray-200 text-gray-700 w-full resize-none p-2 rounded outline-none"
          name="description"
          placeholder="Description"
          rows={5}
          value={userDetails.description}
          onChange={handleChange}
        />
      </div>
      <p className="mb-3 w-full">Workspaces</p>
      <div className="w-full">
        {_map(workspaces, (_, index) => (
          <WorkspaceCard
            key={index}
            handleChange={setWorkspaces}
            index={index}
            workspaces={workspaces}
          />
        ))}
        <button
          className="rounded bg-purple-50 text-purple-400 px-2 py-1 font-bold mb-2"
          onClick={() => setWorkspaces((workspaces) => [...workspaces, {}])}
        >
          + Add workspace
        </button>
      </div>
      <button
        className="bg-green-400 text-white mt-auto font-bold p-2 px-4 rounded-xl outline-none"
        onClick={onClick}
      >
        Register
      </button>
    </>
  );
}

export default Professional;
