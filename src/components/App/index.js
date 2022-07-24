import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import BasicTable from "../BasicTable";
import { USERS_TABLE_COLUMNS } from "../../constants";
import { fetchUsers } from "../../requests/users";

function App() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers({ params: { results: 5 } }));
  }, []);

  return (
    <Grid container spacing={4} sx={{ p: 6 }}>
      <Grid item xs={12} sm={12} md={12}>
        <TextField
          name="search"
          label="Search"
          placeholder="Search..."
          // onChange={}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            endAdornment: (
              <IconButton color="primary">
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
      </Grid>

      <Grid item xs={12} sm={12} md={12}>
        <BasicTable
          columns={USERS_TABLE_COLUMNS}
          data={[
            {
              id: "1",
              login: { username: "johndoe" },
              name: { first: "John", last: "Doe" },
              email: "john-doe@gmail.com",
              gender: "male",
              registered: { date: "24-07-2022 11:11" },
            },
            {
              id: "2",
              login: { username: "janedoe" },
              name: { first: "Jane", last: "Doe" },
              email: "jane-doe@gmail.com",
              gender: "female",
              registered: { date: "23-07-2022 10:10" },
            },
          ]}
          stickyHeader
        />
      </Grid>
    </Grid>
  );
}

export default App;
