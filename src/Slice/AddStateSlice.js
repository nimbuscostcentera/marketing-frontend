import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `${process.env.REACT_APP_BASEURL}/auth-routes/state-add`;

export const AddStateFunc = createAsyncThunk(
  "AddState",
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

const AddStateSlice = createSlice({
  name: "AddState",
  initialState: {
    isAddStateLoading: false,
    AddStateSuccessMsg: [],
    AddStateErrorMsg: "",
    isAddStateError: false,
    isAddStateSuccess: false,
  },
  reducers: {
    ClearStateAddState: (state) => {
      state.AddStateErrorMsg = "";
      state.isAddStateError = false;
      state.isAddStateSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddStateFunc.pending, (state) => {
        state.isAddStateLoading = true;
        state.isAddStateError = false;
        state.isAddStateSuccess = false;
      })
      .addCase(AddStateFunc.fulfilled, (state, { payload }) => {
        state.isAddStateError = false;
        state.isAddStateLoading = false;
        state.isAddStateSuccess = true;
        state.AddStateSuccessMsg = payload;
      })
      .addCase(AddStateFunc.rejected, (state, { payload }) => {
        state.isAddStateLoading = false;
        state.isAddStateError = true;
        state.isAddStateSuccess = false;
        state.AddStateErrorMsg = payload;
      });
  },
});
export const { ClearStateAddState } = AddStateSlice.actions;
export default AddStateSlice.reducer;
