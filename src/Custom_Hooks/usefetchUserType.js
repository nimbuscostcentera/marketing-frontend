import React, { useEffect, useMemo } from "react";
import { getAllUserTypeList } from "../Slice/UserTypeListSlice";
import { useDispatch, useSelector } from "react-redux";
function useFetchUserType(obj = {}, dep = []) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUserTypeList(obj));
  }, dep);
  const {
    isUserTypeLoading,
    UserTypeList,
    UserTypeErrorMsg,
    isUserTypeError,
    isUserTypeSuccess,
  } = useSelector((state) => state.usertypelist);
  const UserTypeListData = useMemo(() => {
    if (isUserTypeSuccess) {
      return UserTypeList || [];
    } else {
      return [];
    }
  }, [isUserTypeSuccess]);
  return {
    isUserTypeLoading,
    UserTypeListData,
    UserTypeErrorMsg,
    isUserTypeError,
    isUserTypeSuccess,
  };
}

export default useFetchUserType;
