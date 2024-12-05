import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `${process.env.REACT_APP_BASEURL}/auth-routes/salesman-list`;

export const getAllSalesMan = createAsyncThunk(
  "SalesManList",
  async (UserData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(URL, UserData, config);
      return data?.response || [];
    } catch (error) {
      return rejectWithValue(error.response.data.response);
    }
  }
);

const SalesManSlice = createSlice({
  name: "SalesManList",
  initialState: {
    isSalesManLoading: false,
    SalesManList: [],
    SalesManErrorMsg: "",
    isSalesManError: false,
    isSalesManSuccess: false,
  },
  reducers: {
    ClearStateSalesMan: (state) => {
      state.SalesManErrorMsg = "";
      state.isSalesManError = false;
      state.isSalesManSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSalesMan.pending, (state) => {
        state.isSalesManLoading = true;
        state.isSalesManError = false;
        state.isSalesManSuccess = false;
      })
      .addCase(getAllSalesMan.fulfilled, (state, { payload }) => {
        state.isSalesManError = false;
        state.isSalesManLoading = false;
        state.isSalesManSuccess = true;
        state.SalesManList = payload;
      })
      .addCase(getAllSalesMan.rejected, (state, { payload }) => {
        state.isSalesManLoading = false;
        state.isSalesManError = true;
        state.isSalesManSuccess = false;
        state.SalesManErrorMsg = payload;
      });
  },
});
export const { ClearStateSalesMan } = SalesManSlice.actions;
export default SalesManSlice.reducer;
