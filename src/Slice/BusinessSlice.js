import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AxiosInstance from "../store/AxiosInstance";
const URL = `${process.env.REACT_APP_BASEURL}/auth-routes/getbusinesslist`;

export const getAllBusiness = createAsyncThunk(
  "BusinessList",
  async (UserData, { rejectWithValue }) => {
    try {
      const { data } = await AxiosInstance.get(URL, UserData);
      return data?.response || [];
    } catch (error) {
      return rejectWithValue(error.response.data.response);
    }
  }
);

const BusinessSlice = createSlice({
  name: "BusinessList",
  initialState: {
    isBusinessLoading: false,
    BusinessList: [],
    BusinessErrorMsg: "",
    isBusinessError: false,
    isBusinessSuccess: false,
  },
  reducers: {
    ClearStateBusiness: (state) => {
      state.BusinessErrorMsg = "";
      state.isBusinessError = false;
      state.isBusinessSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBusiness.pending, (state) => {
        state.isBusinessLoading = true;
        state.isBusinessError = false;
        state.isBusinessSuccess = false;
      })
      .addCase(getAllBusiness.fulfilled, (state, { payload }) => {
        state.isBusinessError = false;
        state.isBusinessLoading = false;
        state.isBusinessSuccess = true;
        state.BusinessList = payload;
      })
      .addCase(getAllBusiness.rejected, (state, { payload }) => {
        state.isBusinessLoading = false;
        state.isBusinessError = true;
        state.isBusinessSuccess = false;
        state.BusinessErrorMsg = payload;
      });
  },
});
export const { ClearStateBusiness } = BusinessSlice.actions;
export default BusinessSlice.reducer;
