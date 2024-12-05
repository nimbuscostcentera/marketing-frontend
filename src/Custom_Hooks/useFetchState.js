import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStateList } from "../Slice/StateListSlice";
function useFetchState(obj = {}, dep = []) {

  const dispatch = useDispatch();

// console.log(obj);

  useEffect(() => {
    dispatch(getAllStateList(obj));
  }, dep);


  const {
    isStateLoading,
    StateList,
    StateErrorMsg,
    isStateError,
    isStateSuccess
  } = useSelector((state) => state.statelist);


  const StateListData = useMemo(() => {
    if (isStateSuccess) {
      return StateList || [];
    } else {
      return [];
    }
  }, [isStateSuccess]);
  return {
    isStateLoading,
    StateListData,
    StateErrorMsg,
    isStateError,
    isStateSuccess
  };
}

export default useFetchState;
