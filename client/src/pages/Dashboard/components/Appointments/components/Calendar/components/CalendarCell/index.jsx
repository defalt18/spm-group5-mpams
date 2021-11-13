import React from "react";
import c from "classnames";
import Popover from "@mui/material/Popover";
import _noop from "lodash/noop";
import InsertInvitationTwoToneIcon from "@mui/icons-material/InsertInvitationTwoTone";
import { format, getDate, getDay, getMonth, isToday } from "date-fns";
import Appointment from "./ components/Appointment";

const anchorOrigin = {
  vertical: "top",
  horizontal: "right",
};

export const CalendarCell = React.memo((props) => {
  const { isLast, date, actualDate } = props;
  const label = getDate(date);
  const disabled =
    getDay(date) === 0 || getMonth(date) !== getMonth(actualDate);
  const today = isToday(date);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <div
        className={c(
          "h-24 w-full p-2 flex flex-col relative justify-between",
          !isLast ? "border-r border-gray-400 border-opacity-50" : "",
          disabled ? "bg-gray-200" : "cursor-pointer"
        )}
        onClick={!disabled ? handleClick : _noop}
      >
        <div
          className={c(
            "text-lg flex justify-end w-full",
            disabled ? "text-gray-500" : ""
          )}
        >
          {!today ? (
            <span>{label}</span>
          ) : (
            <span className="text-white bg-red-500 h-8 w-8 grid place-items-center rounded-3xl">
              {label}
            </span>
          )}
        </div>
        {label === 12 && (
          <div className="w-full flex flex-wrap gap-1 items-center">
            <div className="h-2 w-2 rounded-2xl bg-green-400" />
            <div className="h-2 w-2 rounded-2xl bg-yellow-300" />
            <div className="h-2 w-2 rounded-2xl bg-red-500" />
          </div>
        )}
      </div>
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={anchorOrigin}
        id={id}
        open={open}
        onClose={handleClose}
      >
        <div className="w-full p-2">
          <div className="font-bold flex justify-between items-center text-lg pb-2 border-b border-gray-400 w-full mb-2">
            <span>Appointments</span>
            <InsertInvitationTwoToneIcon />
          </div>
          <div className="flex flex-col gap-y-2">
            <span className="text-sm text-gray-600">
              {format(date, "dd MMMM yyyy")}
            </span>
            <Appointment priority="notUrgent" />
            <Appointment priority="medium" />
            <Appointment priority="urgent" />
          </div>
        </div>
      </Popover>
    </>
  );
});
