import React, { useCallback } from "react";
import c from "classnames";
import Tooltip from "@mui/material/Tooltip";
import { default as DetailsIcon } from "@mui/icons-material/ReadMoreOutlined";
import dummy_workspace from "assets/images/random.jpeg";
import _head from "lodash/head";
import { Avatar, Dialog } from "@mui/material";
import ProfessionalDetails from "../../People/components/UserCard/components/ProfessionalDetails";
import { useToggle } from "react-use";

const iconStyle = {
  height: 23,
  width: 23,
  color: "black",
};

const avatarStyle = {
  height: 26,
  width: 26,
};

function ContentCard(props) {
  const { type, content } = props;
  const [open, toggle] = useToggle(false);

  const renderContent = useCallback(() => {
    if (type === "USER") {
      const { name, photo, profession } = content;
      return (
        <>
          <div className="flex items-center gap-x-2">
            <Avatar src={photo} style={avatarStyle} />
            <div className="flex gap-x-2 items-center">
              <p className="text-black text-sm">{name}</p>
              <p className="text-gray-700 text-xs bg-gray-100 p-1 px-2 rounded-3xl w-max">
                {profession}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-x-2">
            <button onClick={toggle}>
              <Tooltip title="Show details">
                <DetailsIcon
                  className="bg-gray-100 rounded-2xl p-1"
                  style={iconStyle}
                />
              </Tooltip>
            </button>
          </div>
          <Dialog open={open} onClose={toggle}>
            <ProfessionalDetails toggle={toggle} {...content} />
          </Dialog>
        </>
      );
    }

    if (type === "PROFESSIONAL") {
      const { workspaceName, mobileNo, imageUris } = content;
      return (
        <>
          <div className="flex items-center gap-x-2">
            <img
              className="rounded h-8 w-8 object-cover"
              src={_head(imageUris) || dummy_workspace}
            />
            <div className="flex flex-col">
              <p className="text-black text-sm">{workspaceName}</p>
              <p className="text-gray-500 text-xs">Contact: {mobileNo}</p>
            </div>
          </div>
        </>
      );
    }
    return null;
  }, [content, type, toggle, open]);
  return (
    <div
      className={c(
        "py-1.5 flex justify-between items-center border-b border-gray-300 w-full"
      )}
    >
      {renderContent()}
    </div>
  );
}

export default React.memo(ContentCard);
