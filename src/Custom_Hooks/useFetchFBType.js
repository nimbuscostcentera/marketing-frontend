import React, { useEffect, useMemo } from "react";
import { getAllFBTypeList } from "../Slice/FeedBackTypeSlice";
import { useDispatch, useSelector } from "react-redux";
function useFetchFBType(obj = {}, dep = []) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllFBTypeList(obj));
  }, dep);
  const {
    isFBTypeLoading,
    FBTypeList,
    FBTypeErrorMsg,
    isFBTypeError,
    isFBTypeSuccess,
  } = useSelector((state) => state.fbtypelist);
  const FBTypeListData = useMemo(() => {
    if (isFBTypeSuccess) {
      return FBTypeList || [];
    } else {
      return [];
    }
  }, [isFBTypeSuccess]);
  return {
    isFBTypeLoading,
    FBTypeListData,
    FBTypeErrorMsg,
    isFBTypeError,
    isFBTypeSuccess,
  };
}

export default useFetchFBType;
