import React, { Suspense } from "react";
import Loader from "components/Loader";
import CalendarTodayTwoToneIcon from "@mui/icons-material/CalendarTodayTwoTone";
const Calendar = React.lazy(() => import("./components/Calendar"));

function Appointments(props) {
  const { user } = props;
  return (
    <div className="flex-1 bg-gray-100 p-8 h-full overflow-scroll">
      <div className="font-bold text-2xl mb-6 flex items-center gap-x-2">
        <span>Appointment Calendar</span>
        <CalendarTodayTwoToneIcon />
      </div>
      <Suspense fallback={<Loader />}>
        <Calendar />
      </Suspense>
    </div>
  );
}

export default React.memo(Appointments);
