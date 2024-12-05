import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `${process.env.REACT_APP_BASEURL}/auth-routes/salesman-add`;

export const AddSalesManFunc = createAsyncThunk(
  "AddSalesMan",
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

const AddSalesManSlice = createSlice({
  name: "AddSalesMan",
  initialState: {
    isAddSalesManLoading: false,
    AddSalesManSuccessMsg: [],
    AddSalesManErrorMsg: "",
    isAddSalesManError: false,
    isAddSalesManSuccess: false,
  },
  reducers: {
    ClearAddSalesMan: (state) => {
      state.AddSalesManErrorMsg = "";
      state.isAddSalesManError = false;
      state.isAddSalesManSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddSalesManFunc.pending, (state) => {
        state.isAddSalesManLoading = true;
        state.isAddSalesManError = false;
        state.isAddSalesManSuccess = false;
      })
      .addCase(AddSalesManFunc.fulfilled, (state, { payload }) => {
        state.isAddSalesManError = false;
        state.isAddSalesManLoading = false;
        state.isAddSalesManSuccess = true;
        state.AddSalesManSuccessMsg = payload;
      })
      .addCase(AddSalesManFunc.rejected, (state, { payload }) => {
        state.isAddSalesManLoading = false;
        state.isAddSalesManError = true;
        state.isAddSalesManSuccess = false;
        state.AddSalesManErrorMsg = payload;
      });
  },
});
export const { ClearAddSalesMan } = AddSalesManSlice.actions;
export default AddSalesManSlice.reducer;
