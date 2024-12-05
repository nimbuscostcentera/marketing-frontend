import React, { useEffect, useMemo, useState } from "react";
import { ClearStateBusiness, getAllBusiness } from "../Slice/BusinessSlice";
import { useDispatch, useSelector } from "react-redux";
const useFetchBusiness = (obj = {}, dep = []) => {
  const dispatch = useDispatch();
  const {
    isBusinessLoading,
    BusinessList,
    BusinessErrorMsg,
    isBusinessError,
    isBusinessSuccess,
  } = useSelector((state) => state.businesslist);

  useEffect(() => {
    dispatch(getAllBusiness(obj));
  }, dep);

  let BusinessListData = useMemo(() => {
    if (isBusinessSuccess) {
      return BusinessList;
    } else {
      return [];
    }
  }, [isBusinessSuccess, BusinessList]);

  return {
    BusinessListData,
    isBusinessLoading,
    BusinessErrorMsg,
    isBusinessError,
    isBusinessSuccess,
  };
};

export default useFetchBusiness;
