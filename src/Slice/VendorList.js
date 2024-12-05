import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `${process.env.REACT_APP_BASEURL}/auth-routes/vendor-list`;

export const getAllVendorList = createAsyncThunk(
  "VendorList",
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

 const VendorListSlice = createSlice({
  name: "VendorList",
  initialState: {
    isVendorLoading: false,
    VendorList: [],
    VendorErrorMsg: "",
    isVendorError: false,
    isVendorSuccess: false,
  },
  reducers: {
    ClearStateVendor: (state) => {
      state.VendorErrorMsg = "";
      state.isVendorError = false;
      state.isVendorSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllVendorList.pending, (state) => {
        state.isVendorLoading = true;
        state.isVendorError = false;
        state.isVendorSuccess = false;
      })
      .addCase(getAllVendorList.fulfilled, (state, { payload }) => {
        state.isVendorError = false;
        state.isVendorLoading = false;
        state.isVendorSuccess = true;
        state.VendorList = payload;
      })
      .addCase(getAllVendorList.rejected, (state, { payload }) => {
        state.isVendorLoading = false;
        state.isVendorError = true;
        state.isVendorSuccess = false;
        state.VendorErrorMsg = payload;
      });
  },
});
export const { ClearStateVendor } = VendorListSlice.actions;
export default VendorListSlice.reducer;
