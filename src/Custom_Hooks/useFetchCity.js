import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCityList } from "../Slice/CityListSlice";
function useFetchCity(obj = {}, dep = []) {

  const dispatch = useDispatch();

// console.log(obj);

  useEffect(() => {
    dispatch(getAllCityList(obj));
  }, dep);


  const {
    isCityLoading,
    CityList,
    CityErrorMsg,
    isCityError,
    isCitySuccess,
  } = useSelector((state) => state.city);


  const CityListData = useMemo(() => {
    if (isCitySuccess) {
        // console.log(CityList)
      return CityList || [];
    } else {
      return [];
    }
  }, [isCitySuccess]);
  return {
    isCityLoading,
    CityListData,
    CityErrorMsg,
    isCityError,
    isCitySuccess,
  };
}

export default useFetchCity;
