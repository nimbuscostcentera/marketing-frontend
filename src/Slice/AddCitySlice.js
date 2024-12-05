import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `${process.env.REACT_APP_BASEURL}/auth-routes/city-add`;

export const AddCityFunc = createAsyncThunk(
  "AddCity",
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

const AddCitySlice = createSlice({
  name: "AddCity",
  initialState: {
    isAddCityLoading: false,
    AddCitySuccessMsg: [],
    AddCityErrorMsg: "",
    isAddCityError: false,
    isAddCitySuccess: false,
  },
  reducers: {
    ClearCityAddCity: (City) => {
      City.AddCityErrorMsg = "";
      City.isAddCityError = false;
      City.isAddCitySuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddCityFunc.pending, (City) => {
        City.isAddCityLoading = true;
        City.isAddCityError = false;
        City.isAddCitySuccess = false;
      })
      .addCase(AddCityFunc.fulfilled, (City, { payload }) => {
        City.isAddCityError = false;
        City.isAddCityLoading = false;
        City.isAddCitySuccess = true;
        City.AddCitySuccessMsg = payload;
      })
      .addCase(AddCityFunc.rejected, (City, { payload }) => {
        City.isAddCityLoading = false;
        City.isAddCityError = true;
        City.isAddCitySuccess = false;
        City.AddCityErrorMsg = payload;
      });
  },
});
export const { ClearCityAddCity } = AddCitySlice.actions;
export default AddCitySlice.reducer;
