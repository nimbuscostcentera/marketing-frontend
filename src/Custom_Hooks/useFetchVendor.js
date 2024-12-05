import React, { useEffect, useMemo } from "react";
import  {getAllVendorList}  from "../Slice/VendorList";
import { useDispatch, useSelector } from "react-redux";
function useFetchVendor({ obj = {}, dep = [] }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllVendorList(obj));
  }, dep);
  const {
    isVendorLoading,
    VendorList,
    VendorErrorMsg,
    isVendorError,
    isVendorSuccess,
  } = useSelector((state) => state.vendorlist);
  const VendorListData = useMemo(() => {
    if (isVendorSuccess) {
      return VendorList || [];
    } else {
      return [];
    }
  }, [isVendorSuccess]);
  return {
    isVendorLoading,
    VendorListData,
    VendorErrorMsg,
    isVendorError,
    isVendorSuccess
  };
}

export default useFetchVendor;
