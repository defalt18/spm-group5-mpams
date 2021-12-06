import React from "react";
import c from "classnames";
import Popover from "@mui/material/Popover";
import _noop from "lodash/noop";
import _map from "lodash/map";
import _filter from "lodash/filter";
import InsertInvitationTwoToneIcon from "@mui/icons-material/InsertInvitationTwoTone";
import {
  format,
  getDate,
  getDay,
  getMonth,
  isSameDay,
  isToday,
} from "date-fns";
import Appointment from "./ components/Appointment";
import _isEmpty from "lodash/isEmpty";

const anchorOrigin = {
  vertical: "top",
  horizontal: "right",
};

const priority = {
  urgent: "bg-red-500",
  notUrgent: "bg-green-400",
  medium: "bg-yellow-300",
};

export const CalendarCell = React.memo((props) => {
  const { isLast, date, actualDate, data, user, toggleUpdate } = props;
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

  const getFilteredData = (data) =>
    _filter(data, ({ timestamp }) => isSameDay(date, new Date(timestamp)));

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

        <div className="w-full flex flex-wrap gap-1 items-center">
          {_map(getFilteredData(data), ({ priority: p }) => (
            <div className={c("h-2 w-2 rounded-2xl", priority[p])} />
          ))}
        </div>
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
              {format(date, "d MMMM yyyy")}
            </span>
            {_isEmpty(getFilteredData(data)) ? (
              <p className="text-base text-gray-700 font-bold">
                No appointments on this day
              </p>
            ) : (
              _map(getFilteredData(data), (item) => (
                <Appointment
                  {...item}
                  loggedInUser={user}
                  toggleUpdate={toggleUpdate}
                />
              ))
            )}
          </div>
        </div>
      </Popover>
    </>
  );
});
