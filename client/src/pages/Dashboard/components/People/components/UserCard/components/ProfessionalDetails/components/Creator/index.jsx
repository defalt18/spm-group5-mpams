import React, { useCallback, useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
} from "@mui/material";
import c from "classnames";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateTimePicker from "@mui/lab/DateTimePicker";
import workspace_image from "assets/images/random.jpeg";
import _map from "lodash/map";
import { LocalizationProvider } from "@mui/lab";
import { VIEWS } from "../../views";
import { useAsync, useToggle } from "react-use";
import { createAppointment, fetchWorkspaces } from "utils";
import Loader from "components/Loader";
import { useUserContext } from "hooks/useUser";
import _isEmpty from "lodash/isEmpty";

function Creator(props) {
  const { user } = useUserContext();
  const [appointmentDetails, setDetails] = useState({
    timestamp: new Date(),
    requestedTo: "",
    description: "",
    priority: "",
  });
  const {
    workspaceInfo = [
      { name: "Sunshine", address: "Noida" },
      { name: "RSF", address: "Delhi" },
      { name: "Cantonment", address: "Lucknow" },
    ],
    toggle,
    email,
    setView,
  } = props;

  const [appointmentLoading, toggleLoading] = useToggle(false);
  const { loading, value: workspaces } = useAsync(() =>
    fetchWorkspaces(workspaceInfo)
  );

  // console.log(workspaces, workspaceInfo);
  const onNext = useCallback(async () => {
    toggleLoading();
    if (_isEmpty(appointmentDetails.requestedTo)) {
      alert("Please select workspace");
      toggleLoading();
      return;
    }
    await createAppointment(user, appointmentDetails, email).catch((err) =>
      alert(err.message)
    );
    setView(VIEWS.Greetings);
  }, [user, setView, toggleLoading, appointmentDetails, email]);

  const handleChange = useCallback((newDate) => {
    setDetails((details) => ({ ...details, timestamp: newDate }));
  }, []);

  const handleDetailsChange = useCallback(
    ({ target }) => {
      setDetails((details) => ({ ...details, [target.name]: target.value }));
    },
    [setDetails]
  );

  if (loading || appointmentLoading) return <Loader type="comp" />;

  return (
    <div className="p-3">
      <div className="w-full flex justify-between items-center">
        <p className="text-lg font-bold text-gray-700">Select workspace</p>
        <IconButton onClick={toggle}>
          <CloseRoundedIcon className="text-blue-500" />
        </IconButton>
      </div>
      <div className="flex items-center gap-x-2 flex-wrap justify-evenly">
        {_map(workspaces, (workspace, index) => (
          <button
            key={index}
            className={c(
              "flex flex-col items-center hover:bg-gray-100 p-2 rounded",
              appointmentDetails.requestedTo === workspace._id
                ? "bg-gray-100"
                : ""
            )}
            onClick={() =>
              handleDetailsChange({
                target: { name: "requestedTo", value: workspace._id },
              })
            }
          >
            <img
              alt={workspace.workspaceName}
              className="h-20 w-20 object-cover rounded"
              src={workspace?.imagesUris[0] || workspace_image}
            />
            <p className="font-bold">{workspace.workspaceName}</p>
            <p className="text-gray-500 truncate">{workspace.address}</p>
          </button>
        ))}
      </div>
      <div className="w-full flex flex-col items-center">
        <FormControl component="fieldset">
          <RadioGroup
            row
            defaultValue="notUrgent"
            name="priority"
            value={appointmentDetails.priority}
            onChange={handleDetailsChange}
          >
            <FormControlLabel
              control={<Radio />}
              label="Urgent"
              value="urgent"
            />
            <FormControlLabel
              control={<Radio />}
              label="Not Urgent"
              value="notUrgent"
            />
            <FormControlLabel
              control={<Radio />}
              label="Medium"
              value="medium"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div className="my-3 w-full grid place-items-center">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            label="Appointment Time"
            renderInput={(params) => (
              <TextField {...params} className="w-full" />
            )}
            value={appointmentDetails.timestamp}
            onChange={handleChange}
          />
        </LocalizationProvider>
      </div>
      <div className="w-full my-2">
        <textarea
          className="bg-gray-100 text-gray-700 font-bold w-full resize-none p-2 rounded outline-none"
          name="description"
          placeholder="Description"
          rows={5}
          value={appointmentDetails.description}
          onChange={handleDetailsChange}
        />
      </div>
      <div className="w-full flex flex-col items-center">
        <button
          className="p-1 px-2 bg-blue-100 font-bold text-blue-500 rounded"
          onClick={onNext}
        >
          Proceed
        </button>
      </div>
    </div>
  );
}

export default React.memo(Creator);
