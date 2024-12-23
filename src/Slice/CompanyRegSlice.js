import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AxiosInstance from "../store/AxiosInstance";
const URL = `${process.env.REACT_APP_BASEURL}/auth-routes/companyreg`;

export const CompanyRegFunc = createAsyncThunk(
  "CompanyReg",
  async (UserData, { rejectWithValue }) => {
    try {
      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };
      const { data } = await AxiosInstance.post(URL, UserData);
      return data;
    } catch (error) {
      // console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

const CompanyRegSlice = createSlice({
  name: "CompanyReg",
  initialState: {
    isComRegLoding: false,
    CompRegSuccessMsg: "",
    CompRegErrorMsg: "",
    isCompRegErrorMsg: false,
    isCompRegSuccess: false,
  },
  reducers: {
    CompRegClearState: (state) => {
      state.CompRegErrorMsg = "";
      state.isCompRegErrorMsg = false;
      state.isCompRegSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(CompanyRegFunc.pending, (state) => {
        state.isComRegLoding = true;
        state.isCompRegErrorMsg = false;
        state.isCompRegSuccess = false;
      })
      .addCase(CompanyRegFunc.fulfilled, (state, { payload }) => {
        state.isCompRegErrorMsg = false;
        state.isComRegLoding = false;
        state.isCompRegSuccess = true;
        state.CompRegSuccessMsg = payload;
      })
      .addCase(CompanyRegFunc.rejected, (state, { payload }) => {
        state.isComRegLoding = false;
        state.isCompRegErrorMsg = true;
        state.isCompRegSuccess = false;
        state.CompRegErrorMsg = payload;
      });
  },
});
export const { CompRegClearState } = CompanyRegSlice.actions;
export default CompanyRegSlice.reducer;
