import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import _ from "lodash";

const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  ({ sortBy, sortOrder, page }) => {
    return axios
      .get("https://randomuser.me/api", {
        params: {
          results: 10,
          inc: "id,login,name,email,gender,registered",
          sortBy,
          sortOrder,
          page,
        },
      })
      .then((res) => res.data);
  }
);

export { fetchUsers };
