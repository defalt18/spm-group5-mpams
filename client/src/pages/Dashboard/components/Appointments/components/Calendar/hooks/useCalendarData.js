import { useCallback, useMemo, useState } from "react";
import {
  addMonths,
  getDate,
  getDay,
  getDaysInMonth,
  getMonth,
  getYear,
  isToday,
} from "date-fns";

export function useCalendarData() {
  const [date, setDate] = useState(Date.now());

  const startDay = useMemo(
    () => getDay(new Date(getYear(date), getMonth(date), 1)),
    [date]
  );

  const totalDays = useMemo(() => getDaysInMonth(date), [date]);

  const nextMonthToggle = useCallback(() => {
    setDate((currDate) => addMonths(currDate, 1));
  }, [setDate]);

  const prevMonthToggle = useCallback(() => {
    setDate((currDate) => addMonths(currDate, -1));
  }, [setDate]);

  const getLabel = useCallback(
    (indexRow, index) => {
      const firstRow = 7 - startDay;
      const day = index + 1 + firstRow + (indexRow - 1) * 7;

      if (indexRow === 0) {
        return index < startDay ? "" : index + 1 - startDay;
      }

      if (day > totalDays) return "";

      return day;
    },
    [startDay, totalDays]
  );

  const isDisabled = useCallback(
    (indexRow, index) => {
      if (indexRow === 0) {
        if (
          getDay(
            new Date(getYear(date), getMonth(date), index + 1 - startDay)
          ) === 0 ||
          index < startDay
        )
          return true;
      }

      const firstRow = 7 - startDay;
      const day = index + 1 + firstRow + (indexRow - 1) * 7 + 1;
      if (
        getDay(new Date(getYear(date), getMonth(date), getDate(date) + day)) ===
        0
      )
        return true;

      return day - 1 > totalDays;
    },
    [startDay, date, totalDays]
  );

  const isTodayByCalendar = useCallback(
    (indexRow, index) => {
      const newDate = new Date(
        getYear(date),
        getMonth(date),
        getLabel(indexRow, index)
      );
      return isToday(newDate);
    },
    [date, getLabel]
  );

  return {
    date,
    getLabel,
    isDisabled,
    isToday: isTodayByCalendar,
    nextMonthToggle,
    prevMonthToggle,
  };
}
