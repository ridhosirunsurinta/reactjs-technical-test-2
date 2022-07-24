import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchUsers = createAsyncThunk("users/fetchUsers", ({ params }) => {
  return axios
    .get(
      "https://randomuser.me/api/?inc=id,login,name,email,gender,registered",
      { params }
    )
    .then((res) => res.data);
});

export { fetchUsers };
