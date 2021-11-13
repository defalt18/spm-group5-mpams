import React from "react";
import _map from "lodash/map";
import { useCalendarData } from "./hooks/useCalendarData";
import CalendarHeader from "./components/CalendarHeader";
import { CalendarCell } from "./components/CalendarCell";

function Calendar(props) {
  const { getCalendarDate, ...rest } = useCalendarData();

  return (
    <div className="w-full">
      <CalendarHeader {...rest} />
      {_map(Array(6).fill(0), (row, indexRow) => (
        <div
          key={indexRow}
          className="grid grid-cols-7 w-full border border-gray-400 border-t-0 border-opacity-50"
        >
          {_map(Array(7).fill(0), (cell, index) => (
            <CalendarCell
              actualDate={rest.date}
              date={getCalendarDate(indexRow, index)}
              isLast={index === 6}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Calendar;
