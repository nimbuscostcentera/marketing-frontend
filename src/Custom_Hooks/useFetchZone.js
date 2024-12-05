import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllZoneList } from "../Slice/ZoneListSlice";
function useFetchZone(obj = {}, dep = []) {

  const dispatch = useDispatch();

// console.log(obj);

  useEffect(() => {
    dispatch(getAllZoneList(obj));
  }, dep);


  const {
    isZoneLoading,
    ZoneList,
    ZoneListErrorMsg,
    isZoneError,
    isZoneSuccess,
  } = useSelector((state) => state.zonelist);


  const ZoneListData = useMemo(() => {
    if (isZoneSuccess) {
        // console.log(CityList)
      return ZoneList || [];
    } else {
      return [];
    }
  }, [isZoneSuccess]);
  return {
    isZoneLoading,
    ZoneListData,
    ZoneListErrorMsg,
    isZoneError,
    isZoneSuccess,
  };
}

export default useFetchZone;
