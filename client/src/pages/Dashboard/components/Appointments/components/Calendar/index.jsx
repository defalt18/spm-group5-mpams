import React from "react";
import _map from "lodash/map";
import { useCalendarData } from "./hooks/useCalendarData";
import CalendarHeader from "./components/CalendarHeader";
import { CalendarCell } from "./components/CalendarCell";
import { useUserContext } from "hooks/useUser";
import Loader from "components/Loader";

function Calendar(props) {
  const { user } = useUserContext();
  const { getCalendarDate, loading, ...rest } = useCalendarData(user);

  return (
    <div className="w-full">
      <CalendarHeader {...rest} />
      {loading ? (
        <Loader type="comp" />
      ) : (
        _map(Array(6).fill(0), (row, indexRow) => (
          <div
            key={indexRow}
            className="grid grid-cols-7 w-full border border-gray-400 border-t-0 border-opacity-50"
          >
            {_map(Array(7).fill(0), (cell, index) => (
              <CalendarCell
                actualDate={rest.date}
                data={rest.appointmentData}
                date={getCalendarDate(indexRow, index)}
                isLast={index === 6}
                toggleUpdate={rest.toggleUpdate}
                user={user}
              />
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default React.memo(Calendar);
