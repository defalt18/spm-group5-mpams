import React from "react";
import { Avatar } from "@mui/material";
import avatar from "assets/images/avatar_professional.png";
import _size from "lodash/size";
import { format } from "date-fns";
import { Dialog } from "@mui/material";
import { useToggle } from "react-use";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import DomainTwoToneIcon from "@mui/icons-material/DomainTwoTone";
import AccessTimeTwoToneIcon from "@mui/icons-material/AccessTimeTwoTone";
import ProfessionalDetails from "./components/ProfessionalDetails";

const avatarStyles = {
  height: 100,
  width: 100,
};

function UserCard(props) {
  const [open, toggle] = useToggle(false);
  const {
    name = "Dr. Raghvendra Chaudhury",
    workspaceInfo = [1, 2, 3],
    photo,
    email = "itsraghvendra@gmail.com",
    profession = "Doctor",
  } = props;

  return (
    <>
      <button
        className="shadow-xl p-2 bg-white w-full rounded flex justify-between"
        onClick={toggle}
      >
        <div className="flex items-center gap-x-3">
          <Avatar className="m-2" src={photo || avatar} style={avatarStyles} />
          <div className="flex flex-col gap-y-1">
            <p className="text-base text-left flex items-center gap-x-2">
              <AccountCircleTwoToneIcon />
              <span>{name}</span>
            </p>
            <p className="text-base text-left flex items-center gap-x-2">
              <DomainTwoToneIcon />
              <span>Workspaces : {_size(workspaceInfo)}</span>
            </p>{" "}
            <p className="text-base text-left">
              <span className="font-bold">Email : </span>
              <span>{email}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="bg-green-100 p-1 px-2 text-green-500 uppercase font-bold rounded text-sm">
            {profession}
          </div>
        </div>
      </button>
      <Dialog open={open} onClose={toggle}>
        <ProfessionalDetails toggle={toggle} {...props} />
      </Dialog>
    </>
  );
}

export default UserCard;
