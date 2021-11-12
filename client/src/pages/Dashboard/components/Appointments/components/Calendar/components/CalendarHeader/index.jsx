import React from "react";
import { format } from "date-fns";
import { IconButton } from "@mui/material";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";

function CalendarHeader(props) {
  const { date, prevMonthToggle, nextMonthToggle } = props;
  return (
    <>
      <div className="w-full flex justify-between items-center">
        <p className="text-2xl">
          <span className="font-bold">{format(date, "MMMM")}</span>{" "}
          {format(date, "yyyy")}
        </p>
        <div className="flex items-center gap-x-3">
          <IconButton onClick={prevMonthToggle}>
            <KeyboardArrowLeftRoundedIcon />
          </IconButton>
          <IconButton onClick={nextMonthToggle}>
            <KeyboardArrowRightRoundedIcon />
          </IconButton>
        </div>
      </div>
      <div className="grid grid-cols-7 w-full mt-5 border-b border-gray-400">
        <p className="text-right text-lg w-full px-2">Sun</p>
        <p className="text-right text-lg w-full px-2">Mon</p>
        <p className="text-right text-lg w-full px-2">Tue</p>
        <p className="text-right text-lg w-full px-2">Wed</p>
        <p className="text-right text-lg w-full px-2">Thu</p>
        <p className="text-right text-lg w-full px-2">Fri</p>
        <p className="text-right text-lg w-full px-2">Sat</p>
      </div>
    </>
  );
}

export default React.memo(CalendarHeader);
