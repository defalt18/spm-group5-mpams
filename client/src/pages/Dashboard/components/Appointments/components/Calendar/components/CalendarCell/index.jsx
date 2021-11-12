import React from "react";
import c from "classnames";
import Popover from "@mui/material/Popover";
import _noop from "lodash/noop";

const anchorOrigin = {
  vertical: "top",
  horizontal: "right",
};

export const CalendarCell = React.memo((props) => {
  const { label, isLast, disabled, today } = props;
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
          "h-24 w-full p-2 flex justify-end",
          !isLast ? "border-r border-gray-400" : "",
          disabled ? "bg-gray-200" : "cursor-pointer"
        )}
        onClick={!disabled ? handleClick : _noop}
      >
        <div className={c("text-lg")}>
          {!today ? (
            <span>{label}</span>
          ) : (
            <span className="text-white bg-red-500 h-8 w-8 grid place-items-center rounded-3xl">
              {label}
            </span>
          )}
        </div>
      </div>
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={anchorOrigin}
        id={id}
        open={open}
        onClose={handleClose}
      >
        <p className="text-gray-500 font-bold m-4">
          No appointments on this day
        </p>
      </Popover>
    </>
  );
});
