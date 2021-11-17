import React, { useRef, useState } from "react";
import { Input } from "../Input";

function WorkspaceCard(props) {
  const { handleChange: handleArrayChange, index, workspaces } = props;
  const inputRef = useRef();
  const [workspaceDetails, setDetails] = useState({
    workspaceName: "",
    mobileNo: "",
    address: "",
    imageUris: [],
  });

  const onSelectPic = () => {
    inputRef.current.click();
  };

  const handleDetailsChange = ({ target: { name, value } }) => {
    setDetails((details) => ({ ...details, [name]: value }));
    workspaces[index] = workspaceDetails;
    handleArrayChange(workspaces);
  };

  const handleChange = ({ target: { files } }) => {
    const file = files[0];
    workspaceDetails.imageUris = [file];
    workspaces[index] = workspaceDetails;
    handleArrayChange(workspaceDetails);
    handleDetailsChange({
      target: {
        name: "imageUris",
        value: [...workspaceDetails.imageUris, file],
      },
    });
  };

  return (
    <div className="gap-x-4 p-2 flex w-full bg-gray-50 rounded mb-3 items-center">
      <input
        ref={inputRef}
        accept="image/*"
        className="hidden"
        type="file"
        onChange={handleChange}
      />
      <button
        className="bg-gray-200 text-gray-700 grid place-items-center h-64 w-5/12 rounded-2xl font-bold overflow-hidden"
        onClick={onSelectPic}
      >
        {!workspaceDetails.imageUris[0] ? (
          "Add a photo"
        ) : (
          <img
            className="w-full h-full object-cover"
            src={URL.createObjectURL(workspaceDetails.imageUris[0])}
          />
        )}
      </button>
      <div className="flex-1 flex flex-col gap-y-2">
        <Input
          label="Name"
          name="workspaceName"
          placeholder="RSF Delhi"
          value={workspaceDetails.workspaceName}
          onChange={handleDetailsChange}
        />
        <Input
          label="Mobile No'"
          name="mobileNo"
          placeholder="+1 224 23423423"
          type="number"
          value={workspaceDetails.phone}
          onChange={handleDetailsChange}
        />
        <Input
          label="Address"
          name="address"
          placeholder="Vibhuti khand"
          value={workspaceDetails.address}
          onChange={handleDetailsChange}
        />
      </div>
    </div>
  );
}

export default React.memo(WorkspaceCard);
