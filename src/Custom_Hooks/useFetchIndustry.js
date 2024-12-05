import React, { useEffect, useMemo, useState } from "react";
import { ClearStateIndustry, getAllIndustry } from "../Slice/IndustryListSlice";
import { useDispatch, useSelector } from "react-redux";
const useFetchIndustry = (obj = {}, dep = []) => {
  const dispatch = useDispatch();
  const {
    isIndustryLoading,
    IndustryList,
    IndustryErrorMsg,
    isIndustryError,
    isIndustrySuccess,
  } = useSelector((state) => state.industrylist);

  useEffect(() => {
    dispatch(getAllIndustry(obj));
  }, dep);

  let IndustryListData = useMemo(() => {
    if (isIndustrySuccess) {
      return IndustryList;
    } else {
      return [];
    }
  }, [isIndustrySuccess, IndustryList]);

  return {
    IndustryListData,
    isIndustryLoading,
    IndustryErrorMsg,
    isIndustryError,
    isIndustrySuccess,
  };
};

export default useFetchIndustry;
