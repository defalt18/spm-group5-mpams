import React, { useCallback } from "react";
import { Avatar, IconButton } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import avatar from "assets/images/avatar_professional.png";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import LocalPhoneTwoToneIcon from "@mui/icons-material/LocalPhoneTwoTone";
import { format } from "date-fns";
import { VIEWS } from "../../views";

const avatarStyles = {
  height: 100,
  width: 100,
};

function Details(props) {
  const {
    toggle,
    name = "Dr. Raghvendra Chaudhury",
    start = new Date(Date.now() + 3600 * 1000 * 7),
    end = new Date(Date.now() + 3600 * 1000 * 9),
    profession = "Doctor",
    photo,
    description = "I am a doctor tbh",
    mobileNo = "+91 9324527177",
    setView,
  } = props;

  const onSetAppointment = useCallback(() => {
    setView(VIEWS.Creation);
  }, [setView]);
  return (
    <>
      <div className="h-28 bg-blue-100 w-full flex flex-col items-center">
        <div className="flex justify-end w-full p-2">
          <IconButton onClick={toggle}>
            <CloseRoundedIcon className="text-blue-500" />
          </IconButton>
        </div>
        <Avatar className="mt-2" src={photo || avatar} style={avatarStyles} />
      </div>
      <div className="w-full flex flex-col gap-y-2 items-center px-2 py-3 mt-16">
        <div className="flex flex-col">
          <div className="bg-purple-100 p-1 px-2 text-purple-500 uppercase font-bold rounded text-sm">
            {profession}
          </div>
        </div>
        <p className="text-base text-left flex items-center gap-x-2">
          <AccountCircleTwoToneIcon />
          <span>{name}</span>
        </p>
        <p className="text-base text-left flex items-center gap-x-2">
          <LocalPhoneTwoToneIcon />
          <span>{mobileNo}</span>
        </p>
        {/*<p className="text-base">*/}
        {/*  <span className="font-bold">Available between : </span>*/}
        {/*  <span>*/}
        {/*    {format(new Date(start), "h")} - {format(new Date(end), "h aa")}*/}
        {/*  </span>*/}
        {/*</p>*/}
        <div className="text-center text-gray-500 bg-gray-100 p-2 rounded w-9/12 font-bold my-3">
          {description}
        </div>
        <button
          className="p-1 px-2 bg-green-100 font-bold text-green-500 rounded"
          onClick={onSetAppointment}
        >
          Set appointment
        </button>
      </div>
    </>
  );
}

export default Details;
