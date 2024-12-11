import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AxiosInstance from "../store/AxiosInstance";
const URL = `${process.env.REACT_APP_BASEURL}/auth-routes/weekdays`;

export const getAllWeekDaysList = createAsyncThunk(
  "WeekDaysList",
  async (UserData, { rejectWithValue }) => {
    try {
    //   const config = {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   };
      const { data } = await AxiosInstance.get(URL);
      return data?.response || [];
    } catch (error) {
      return rejectWithValue(error.response.data.response);
    }
  }
);

const WeekDaysListSlice = createSlice({
  name: "WeekDaysList",
  initialState: {
    isWeekDaysLoading: false,
    WeekDaysList: [],
    WeekDaysErrorMsg: "",
    isWeekDaysError: false,
    isWeekDaysSuccess: false,
  },
  reducers: {
    ClearStateWeekDays: (state) => {
      state.WeekDaysErrorMsg = "";
      state.isWeekDaysError = false;
      state.isWeekDaysSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllWeekDaysList.pending, (state) => {
        state.isWeekDaysLoading = true;
        state.isWeekDaysError = false;
        state.isWeekDaysSuccess = false;
      })
      .addCase(getAllWeekDaysList.fulfilled, (state, { payload }) => {
        state.isWeekDaysError = false;
        state.isWeekDaysLoading = false;
        state.isWeekDaysSuccess = true;
        state.WeekDaysList = payload;
      })
      .addCase(getAllWeekDaysList.rejected, (state, { payload }) => {
        state.isWeekDaysLoading = false;
        state.isWeekDaysError = true;
        state.isWeekDaysSuccess = false;
        state.WeekDaysErrorMsg = payload;
      });
  },
});
export const { ClearStateWeekDays } = WeekDaysListSlice.actions;
export default WeekDaysListSlice.reducer;
