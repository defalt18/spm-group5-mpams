import React from "react";
import siteLogo from "assets/images/website_logo.png";
import { Popover } from "@mui/material";

function Header() {
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
    <div className="fixed top-0 w-full flex justify-between items-center p-6 font-bold border-b border-gray-700 bg-black bg-opacity-20">
      <div className="flex items-center gap-x-3 font-mono">
        <img className="h-7 w-7" src={siteLogo} />
        <p>Multi-Profession Appointment Management System</p>
      </div>
      <button className="font-mono" onClick={handleClick}>
        About Us
      </button>
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        id={id}
        open={open}
        style={{ background: "transparent" }}
        onClose={handleClose}
      >
        <div className="flex flex-col items-center gap-y-3 font-mono p-3 w-56">
          <p className="font-bold">SPM Group 5</p>
          <p>Mahir Ratanpara</p>
          <p>Kushagra Pathak</p>
          <p>Nimmi Patel</p>
        </div>
      </Popover>
    </div>
  );
}

export default Header;
