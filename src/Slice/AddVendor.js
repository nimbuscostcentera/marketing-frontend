import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `${process.env.REACT_APP_BASEURL}/auth-routes/vendor-add`;

export const AddVendorFunc = createAsyncThunk(
  "AddVendor",
  async (UserData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(URL, UserData, config);
      return data?.response;
    } catch (error) {
      return rejectWithValue(error.response.data.response);
    }
  }
);

const AddVendorSlice = createSlice({
  name: "AddVendor",
  initialState: {
    isAddVendorLoading: false,
    AddVendorSuccessMsg: [],
    AddVendorErrorMsg: "",
    isAddVendorError: false,
    isAddVendorSuccess: false,
  },
  reducers: {
    ClearStateAddVendor: (state) => {
      state.AddVendorErrorMsg = "";
      state.isAddVendorError = false;
      state.isAddVendorSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddVendorFunc.pending, (state) => {
        state.isAddVendorLoading = true;
        state.isAddVendorError = false;
        state.isAddVendorSuccess = false;
      })
      .addCase(AddVendorFunc.fulfilled, (state, { payload }) => {
        state.isAddVendorError = false;
        state.isAddVendorLoading = false;
        state.isAddVendorSuccess = true;
        state.AddVendorSuccessMsg = payload;
      })
      .addCase(AddVendorFunc.rejected, (state, { payload }) => {
        state.isAddVendorLoading = false;
        state.isAddVendorError = true;
        state.isAddVendorSuccess = false;
        state.AddVendorErrorMsg = payload;
      });
  },
});
export const { ClearStateAddVendor } = AddVendorSlice.actions;
export default AddVendorSlice.reducer;
