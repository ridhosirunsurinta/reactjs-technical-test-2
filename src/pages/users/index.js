import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import BasicTable from "../../components/BasicTable";
import { USERS_TABLE_COLUMNS } from "../../constants";
import { fetchUsers } from "../../requests/users";

function UserPage() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  const formik = useFormik({
    initialValues: {
      keyword: "",
      gender: 0,
    },
    onSubmit: (values) => {
      dispatch(
        fetchUsers({
          params: {
            results: 5,
            keyword: values.keyword,
            gender: getGender(values.gender),
          },
        })
      );
    },
  });

  useEffect(() => {
    dispatch(
      fetchUsers({
        params: { results: 5 },
      })
    );
  }, []);

  function getGender(g) {
    switch (g) {
      case 1:
        return "male";
      case 2:
        return "female";
      default:
        return undefined;
    }
  }

  function handleReset() {
    dispatch(
      fetchUsers({
        params: {
          results: 5,
        },
      })
    );
    formik.resetForm();
  }

  return (
    <Grid container sx={{ px: 6, py: 4 }}>
      <Grid item sx={{ mb: 6 }} xs={12} sm={12} md={12}>
        <Grid
          container
          spacing={2}
          alignItems="center"
          component="form"
          onSubmit={formik.handleSubmit}
        >
          <Grid item xs={12} sx={{ mb: 4 }}>
            <Typography variant="h3" component="div">
              Users
            </Typography>
          </Grid>
          <Grid item sx={{ display: "flex" }}>
            <TextField
              name="keyword"
              label="Search"
              size="small"
              placeholder="search by keyword..."
              InputLabelProps={{ shrink: true }}
              onChange={formik.handleChange}
              value={formik.values.keyword}
            />
          </Grid>
          <Grid item>
            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select
                name="gender"
                label="Gender"
                size="small"
                value={formik.values.gender}
                onChange={formik.handleChange}
              >
                <MenuItem value={0}>All</MenuItem>
                <MenuItem value={1}>Male</MenuItem>
                <MenuItem value={2}>Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              sx={{ alignSelf: "center" }}
              onClick={formik.handleSubmit}
            >
              <SearchIcon />
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#9e9e9e",
                "&:hover": { backgroundColor: "#bdbdbd" },
              }}
              onClick={handleReset}
            >
              Reset Filter
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={12} md={12}>
        <BasicTable
          columns={USERS_TABLE_COLUMNS}
          data={users.results}
          stickyHeader
        />
      </Grid>
    </Grid>
  );
}

export default UserPage;
