import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../store/AxiosInstance";
const URL = `${process.env.REACT_APP_BASEURL}/tarn-routes/feedback-trans`;

export const AddFeedBack = createAsyncThunk(
  "AddFeedBack",
  async (UserData, { rejectWithValue }) => {
    try {

      const { data } = await AxiosInstance.post(URL, UserData);
      return data?.response;
    } catch (error) {
      return rejectWithValue(error.response.data.response);
    }
  }
);

const AddFeedBackSlice = createSlice({
  name: "AddFeedBack",
  initialState: {
    isAddFBLoading: false,
    AddFbSuccessMsg: [],
    AddFbErrorMsg: "",
    isAddFbError: false,
    isAddFbSuccess: false,
  },
  reducers: {
    ClearStateAddFb: (state) => {
      state.AddFbErrorMsg = "";
      state.isAddFbError = false;
      state.isAddFbSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddFeedBack.pending, (state) => {
        state.isAddFBLoading = true;
        state.isAddFbError = false;
        state.isAddFbSuccess = false;
      })
      .addCase(AddFeedBack.fulfilled, (state, { payload }) => {
        state.isAddFbError = false;
        state.isAddFBLoading = false;
        state.isAddFbSuccess = true;
        state.AddFbSuccessMsg = payload;
      })
      .addCase(AddFeedBack.rejected, (state, { payload }) => {
        state.isAddFBLoading = false;
        state.isAddFbError = true;
        state.isAddFbSuccess = false;
        state.AddFbErrorMsg = payload;
      });
  },
});
export const { ClearStateAddFb } = AddFeedBackSlice.actions;
export default AddFeedBackSlice.reducer;
