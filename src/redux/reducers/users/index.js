import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../../../requests/users";

export const counterSlice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    results: [],
    info: {},
    error: "",
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.results = action.payload.results;
      state.info = action.payload.info;
    });

    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.results = [];
      state.info = {};
      state.error = action.error.message;
    });
  },
});

export default counterSlice.reducer;
