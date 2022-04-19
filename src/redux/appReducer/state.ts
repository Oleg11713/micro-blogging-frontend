import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  loading: boolean;
  alert: string;
}

const initialState: AppState = {
  loading: false,
  alert: "",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    showLoader(state) {
      state.loading = true;
    },
    hideLoader(state) {
      state.loading = false;
    },
    showAlert(state, action: PayloadAction<string>) {
      state.alert = action.payload;
    },
    hideAlert(state) {
      state.alert = "";
    },
  },
});

export default appSlice.reducer;
