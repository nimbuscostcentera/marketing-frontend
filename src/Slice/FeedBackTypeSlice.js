import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AxiosInstance from "../store/AxiosInstance";
const URL = `${process.env.REACT_APP_BASEURL}/auth-routes/fbtype`;

export const getAllFBTypeList = createAsyncThunk(
  "FBTypeList",
  async (UserData, { rejectWithValue }) => {
    try {
      
      const { data } = await AxiosInstance.get(URL, UserData);
      return data?.response || [];
    } catch (error) {
      return rejectWithValue(error.response.data.response);
    }
  }
);

const FBTypeListSlice = createSlice({
  name: "FBTypeList",
  initialState: {
    isFBTypeLoading: false,
    FBTypeList: [],
    FBTypeErrorMsg: "",
    isFBTypeError: false,
    isFBTypeSuccess: false,
  },
  reducers: {
    ClearStateFBType: (state) => {
      state.FBTypeErrorMsg = "";
      state.isFBTypeError = false;
      state.isFBTypeSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllFBTypeList.pending, (state) => {
        state.isFBTypeLoading = true;
        state.isFBTypeError = false;
        state.isFBTypeSuccess = false;
      })
      .addCase(getAllFBTypeList.fulfilled, (state, { payload }) => {
        state.isFBTypeError = false;
        state.isFBTypeLoading = false;
        state.isFBTypeSuccess = true;
        state.FBTypeList = payload;
      })
      .addCase(getAllFBTypeList.rejected, (state, { payload }) => {
        state.isFBTypeLoading = false;
        state.isFBTypeError = true;
        state.isFBTypeSuccess = false;
        state.FBTypeErrorMsg = payload;
      });
  },
});
export const { ClearStateFBType } = FBTypeListSlice.actions;
export default FBTypeListSlice.reducer;
