import { useCallback, useMemo, useState } from "react";
import { addMonths, getDay, getDaysInMonth, getMonth, getYear } from "date-fns";
import { useAsync, useToggle } from "react-use";
import { fetchAppointmentsForMonth } from "../../../../../../../utils";

export function useCalendarData(user) {
  const [date, setDate] = useState(Date.now());
  const [update, toggleUpdate] = useToggle(false);

  const startDay = useMemo(
    () => getDay(new Date(getYear(date), getMonth(date), 1)),
    [date]
  );

  const { loading, value: appointmentData } = useAsync(
    () => fetchAppointmentsForMonth(user, date),
    [update]
  );
  const totalDays = useMemo(() => getDaysInMonth(date), [date]);

  const totalDaysPrevMonth = useMemo(
    () => getDaysInMonth(addMonths(date, -1)),
    [date]
  );

  const nextMonthToggle = useCallback(() => {
    setDate((currDate) => addMonths(currDate, 1));
  }, [setDate]);

  const prevMonthToggle = useCallback(() => {
    setDate((currDate) => addMonths(currDate, -1));
  }, [setDate]);

  const getCalendarDate = useCallback(
    (indexRow, index) => {
      const firstRow = 7 - startDay;
      const day = index + 1 + firstRow + (indexRow - 1) * 7;

      if (indexRow === 0) {
        return index < startDay
          ? new Date(
              getYear(date),
              getMonth(date) - 1 >= 0 ? getMonth(date) - 1 : 11,
              totalDaysPrevMonth - startDay + index + 1
            )
          : new Date(getYear(date), getMonth(date), index + 1 - startDay);
      }

      if (day > totalDays)
        return new Date(
          getYear(date),
          (getMonth(date) + 1) % 12,
          day - totalDays
        );

      return new Date(getYear(date), getMonth(date), day);
    },
    [startDay, totalDays, totalDaysPrevMonth, date]
  );

  return {
    date,
    loading,
    toggleUpdate,
    appointmentData,
    getCalendarDate,
    nextMonthToggle,
    prevMonthToggle,
  };
}
