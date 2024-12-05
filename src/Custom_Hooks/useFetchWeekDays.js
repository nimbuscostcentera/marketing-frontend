import React, { useEffect, useMemo } from "react";
import { getAllWeekDaysList } from "../Slice/WeekdaysListSlice";
import { useDispatch, useSelector } from "react-redux";
function useFetchWeekDays(obj = {}, dep = []) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllWeekDaysList(obj));
  }, dep);
  const {
    isWeekDaysLoading,
    WeekDaysList,
    WeekDaysErrorMsg,
    isWeekDaysError,
    isWeekDaysSuccess,
  } = useSelector((state) => state.weekdayslist);
  const WeekDaysListData = useMemo(() => {
    if (isWeekDaysSuccess) {
      return WeekDaysList || [];
    } else {
      return [];
    }
  }, [isWeekDaysSuccess]);
  return {
    isWeekDaysLoading,
    WeekDaysListData,
    WeekDaysErrorMsg,
    isWeekDaysError,
    isWeekDaysSuccess,
  };
}

export default useFetchWeekDays;
