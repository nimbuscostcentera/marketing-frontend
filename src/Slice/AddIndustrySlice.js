import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AxiosInstance from "../store/AxiosInstance";
const URL = `${process.env.REACT_APP_BASEURL}/auth-routes/industry-add`;

export const AddIndustryFunc = createAsyncThunk(
  "AddIndustry",
  async (UserData, { rejectWithValue }) => {
    try {
    
      const { data } = await AxiosInstance.post(URL, UserData);
      return data?.response;
    } catch (error) {
      return rejectWithValue(error.response.data.response);
    }
  }
);

const AddIndustrySlice = createSlice({
  name: "AddIndustry",
  initialState: {
    isAddIndustryLoading: false,
    AddIndustrySuccessMsg: [],
    AddIndustryErrorMsg: "",
    isAddIndustryError: false,
    isAddIndustrySuccess: false,
  },
  reducers: {
    ClearStateAddIndustry: (state) => {
      state.AddIndustryErrorMsg = "";
      state.isAddIndustryError = false;
      state.isAddIndustrySuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddIndustryFunc.pending, (state) => {
        state.isAddIndustryLoading = true;
        state.isAddIndustryError = false;
        state.isAddIndustrySuccess = false;
      })
      .addCase(AddIndustryFunc.fulfilled, (state, { payload }) => {
        state.isAddIndustryError = false;
        state.isAddIndustryLoading = false;
        state.isAddIndustrySuccess = true;
        state.AddIndustrySuccessMsg = payload;
      })
      .addCase(AddIndustryFunc.rejected, (state, { payload }) => {
        state.isAddIndustryLoading = false;
        state.isAddIndustryError = true;
        state.isAddIndustrySuccess = false;
        state.AddIndustryErrorMsg = payload;
      });
  },
});
export const { ClearStateAddIndustry } = AddIndustrySlice.actions;
export default AddIndustrySlice.reducer;