import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `${process.env.REACT_APP_BASEURL}/auth-routes/zone-add`;

export const AddZoneFunc = createAsyncThunk(
  "AddZone",
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

const AddZoneSlice = createSlice({
  name: "AddZone",
  initialState: {
    isAddZoneLoading: false,
    AddZoneSuccessMsg: [],
    AddZoneErrorMsg: "",
    isAddZoneError: false,
    isAddZoneSuccess: false,
  },
  reducers: {
    ClearStateAddZone: (state) => {
      state.AddZoneErrorMsg = "";
      state.isAddZoneError = false;
      state.isAddZoneSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddZoneFunc.pending, (state) => {
        state.isAddZoneLoading = true;
        state.isAddZoneError = false;
        state.isAddZoneSuccess = false;
      })
      .addCase(AddZoneFunc.fulfilled, (state, { payload }) => {
        state.isAddZoneError = false;
        state.isAddZoneLoading = false;
        state.isAddZoneSuccess = true;
        state.AddZoneSuccessMsg = payload;
      })
      .addCase(AddZoneFunc.rejected, (state, { payload }) => {
        state.isAddZoneLoading = false;
        state.isAddZoneError = true;
        state.isAddZoneSuccess = false;
        state.AddZoneErrorMsg = payload;
      });
  },
});
export const { ClearStateAddZone } = AddZoneSlice.actions;
export default AddZoneSlice.reducer;
