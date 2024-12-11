import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AxiosInstance from "../store/AxiosInstance";
const URL = `${process.env.REACT_APP_BASEURL}/auth-routes/customer-type`;

export const getAllCustTypeList = createAsyncThunk(
  "CustTypeList",
  async (UserData, { rejectWithValue }) => {
    try {
      const { data } = await AxiosInstance.get(URL, UserData);
      return data?.response || [];
    } catch (error) {
      return rejectWithValue(error.response.data.response);
    }
  }
);

const CustTypeListSlice = createSlice({
  name: "CustTypeList",
  initialState: {
    isCustTypeLoading: false,
    CustTypeList: [],
    CustTypeErrorMsg: "",
    isCustTypeError: false,
    isCustTypeSuccess: false,
  },
  reducers: {
    ClearStateCustType: (state) => {
      state.CustTypeErrorMsg = "";
      state.isCustTypeError = false;
      state.isCustTypeSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCustTypeList.pending, (state) => {
        state.isCustTypeLoading = true;
        state.isCustTypeError = false;
        state.isCustTypeSuccess = false;
      })
      .addCase(getAllCustTypeList.fulfilled, (state, { payload }) => {
        state.isCustTypeError = false;
        state.isCustTypeLoading = false;
        state.isCustTypeSuccess = true;
        state.CustTypeList = payload;
      })
      .addCase(getAllCustTypeList.rejected, (state, { payload }) => {
        state.isCustTypeLoading = false;
        state.isCustTypeError = true;
        state.isCustTypeSuccess = false;
        state.CustTypeErrorMsg = payload;
      });
  },
});
export const { ClearStateCustType } = CustTypeListSlice.actions;
export default CustTypeListSlice.reducer;
