import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchUsers = createAsyncThunk("users/fetchUsers", ({ params }) => {
  return axios
    .get("https://randomuser.me/api/", { params })
    .then((res) => res.data);
});

export { fetchUsers };
