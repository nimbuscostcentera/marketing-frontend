import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../store/AxiosInstance";
const URL = `${process.env.REACT_APP_BASEURL}/auth-routes/usertype-list`;

export const getAllUserTypeList = createAsyncThunk(
  "UserTypeList",
  async (UserData, { rejectWithValue }) => {
    try {
      const { data } = await AxiosInstance.get(URL, UserData);
      return data?.response || [];
    } catch (error) {
      return rejectWithValue(error.response.data.response);
    }
  }
);

const UserTypeListSlice = createSlice({
  name: "UserTypeList",
  initialState: {
    isUserTypeLoading: false,
    UserTypeList: [],
    UserTypeErrorMsg: "",
    isUserTypeError: false,
    isUserTypeSuccess: false,
  },
  reducers: {
    ClearStateUserType: (state) => {
      state.UserTypeErrorMsg = "";
      state.isUserTypeError = false;
      state.isUserTypeSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUserTypeList.pending, (state) => {
        state.isUserTypeLoading = true;
        state.isUserTypeError = false;
        state.isUserTypeSuccess = false;
      })
      .addCase(getAllUserTypeList.fulfilled, (state, { payload }) => {
        state.isUserTypeError = false;
        state.isUserTypeLoading = false;
        state.isUserTypeSuccess = true;
        state.UserTypeList = payload;
      })
      .addCase(getAllUserTypeList.rejected, (state, { payload }) => {
        state.isUserTypeLoading = false;
        state.isUserTypeError = true;
        state.isUserTypeSuccess = false;
        state.UserTypeErrorMsg = payload;
      });
  },
});
export const { ClearStateUserType } = UserTypeListSlice.actions;
export default UserTypeListSlice.reducer;
