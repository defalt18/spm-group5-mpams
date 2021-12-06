import React from "react";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateTimePicker from "@mui/lab/DateTimePicker";
import TextField from "@mui/material/TextField";

function RescheduleAppointment(props) {
  const { updateAppointment } = props;
  const [updatedTimestamp, setTimestamp] = React.useState(new Date());
  return (
    <div className="bg-gray-100 rounded p-3 px-12 text-black flex flex-col items-center">
      <p className="text-lg font-bold mb-3">Appointment Rescheduling</p>
      <p>Please select a time to reschedule : </p>
      <div className="my-3 w-full grid place-items-center">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            label="Appointment Time"
            renderInput={(params) => (
              <TextField {...params} className="w-full" />
            )}
            value={updatedTimestamp}
            onChange={(date) => setTimestamp(date)}
          />
        </LocalizationProvider>
      </div>
      <button
        className="p-1 px-2 rounded uppercase bg-blue-100 text-blue-500 font-bold w-max"
        onClick={() => updateAppointment({ timestamp: updatedTimestamp })}
      >
        Reschedule
      </button>
    </div>
  );
}

export default React.memo(RescheduleAppointment);
