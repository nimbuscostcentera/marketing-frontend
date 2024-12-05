import React, { useEffect, useMemo } from "react";
import { getAllCustTypeList } from "../Slice/CustomerTypeSlice";
import { useDispatch, useSelector } from "react-redux";
function useFetchCustType(obj = {}, dep = []) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCustTypeList(obj));
  }, dep);
  const {
    isCustTypeLoading,
    CustTypeList,
    CustTypeErrorMsg,
    isCustTypeError,
    isCustTypeSuccess,
  } = useSelector((state) => state.custtypelist);
  const CustTypeListData = useMemo(() => {
    if (isCustTypeSuccess) {
      return CustTypeList || [];
    } else {
      return [];
    }
  }, [isCustTypeSuccess]);
  return {
    isCustTypeLoading,
    CustTypeListData,
    CustTypeErrorMsg,
    isCustTypeError,
    isCustTypeSuccess,
  };
}

export default useFetchCustType;
