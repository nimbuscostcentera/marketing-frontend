import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AxiosInstance from "../store/AxiosInstance";
const URL = `${process.env.REACT_APP_BASEURL}/auth-routes/industry-list`;

export const getAllIndustry = createAsyncThunk(
  "IndustryList",
  async (UserData, { rejectWithValue }) => {
    try {
      const { data } = await AxiosInstance.post(URL, UserData);
      return data?.response || [];
    } catch (error) {
      return rejectWithValue(error.response.data.response);
    }
  }
);

const IndustrySlice = createSlice({
  name: "IndustryList",
  initialState: {
    isIndustryLoading: false,
    IndustryList: [],
    IndustryErrorMsg: "",
    isIndustryError: false,
    isIndustrySuccess: false,
  },
  reducers: {
    ClearStateIndustry: (state) => {
      state.IndustryErrorMsg = "";
      state.isIndustryError = false;
      state.isIndustrySuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllIndustry.pending, (state) => {
        state.isIndustryLoading = true;
        state.isIndustryError = false;
        state.isIndustrySuccess = false;
      })
      .addCase(getAllIndustry.fulfilled, (state, { payload }) => {
        state.isIndustryError = false;
        state.isIndustryLoading = false;
        state.isIndustrySuccess = true;
        state.IndustryList = payload;
      })
      .addCase(getAllIndustry.rejected, (state, { payload }) => {
        state.isIndustryLoading = false;
        state.isIndustryError = true;
        state.isIndustrySuccess = false;
        state.IndustryErrorMsg = payload;
      });
  },
});
export const { ClearStateIndustry } = IndustrySlice.actions;
export default IndustrySlice.reducer;
