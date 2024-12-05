import React, { useEffect, useMemo, useState } from "react";
import { ClearStateSalesMan, getAllSalesMan } from "../Slice/SalesManSlice";
import { useDispatch, useSelector } from "react-redux";
const useFetchSalesMan = (obj = {}, dep = []) => {
  const dispatch = useDispatch();
  const {
    isSalesManLoading,
    SalesManList,
    SalesManErrorMsg,
    isSalesManError,
    isSalesManSuccess,
  } = useSelector((state) => state.allsalesman);

  useEffect(() => {
    dispatch(getAllSalesMan(obj));
  }, dep);

  let salesmanList = useMemo(() => {
    if (isSalesManSuccess) {
      return SalesManList;
    } else {
      return [];
    }
  }, [isSalesManSuccess, SalesManList]);

  return {
    salesmanList,
    isSalesManLoading,
    SalesManErrorMsg,
    isSalesManError,
    isSalesManSuccess,
  };
};

export default useFetchSalesMan;
