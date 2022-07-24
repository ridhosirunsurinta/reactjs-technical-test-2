import { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import { DateTime } from "luxon";
import { fetchUsers } from "../../requests/users";
import _ from "lodash";

function BasicTable(props) {
  const dispatch = useDispatch();
  const { columns, data, size, stickyHeader } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [colValue, setColValue] = useState("");
  const isOpen = Boolean(anchorEl);

  function handleOpenMenu(e, colValue) {
    setAnchorEl(e.currentTarget);
    setColValue(colValue);
  }

  function handleCloseMenu() {
    setAnchorEl(null);
  }

  function handleSort(sortOrder) {
    dispatch(
      fetchUsers({
        sortBy: colValue,
        sortOrder,
      })
    );
    handleCloseMenu();
  }

  function handlePagination(e) {
    dispatch(
      fetchUsers({
        page: e.target.innerText,
      })
    );
  }

  return (
    <Grid container>
      <Grid item xs={12} sx={{ mb: 2 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size={size} stickyHeader={stickyHeader}>
            {/* TABLE HEAD */}
            <TableHead>
              <TableRow>
                {columns.map((col) => {
                  return (
                    <TableCell key={col.label} variant="head" align={col.align}>
                      <Typography component="span">{col.label}</Typography>
                      <IconButton onClick={(e) => handleOpenMenu(e, col.value)}>
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>

            {/* SORT MENU */}
            <Menu open={isOpen} anchorEl={anchorEl} onClose={handleCloseMenu}>
              <MenuItem onClick={() => handleSort(colValue, "ascend")}>
                Sort by ASC
              </MenuItem>
              <MenuItem onClick={() => handleSort(colValue, "descend")}>
                Sort by DESC
              </MenuItem>
            </Menu>

            {/* TABLE BODY */}
            <TableBody>
              {data.map((row, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{row.login.username}</TableCell>
                  <TableCell align="center">{`${row.name.first} ${row.name.last}`}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">
                    {_.startCase(row.gender)}
                  </TableCell>
                  <TableCell align="center">
                    {DateTime.fromISO(row.registered.date).toLocaleString(
                      DateTime.DATETIME_MED
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item sx={{ justifyContent: "center" }}>
        <Pagination count={10} onClick={handlePagination} />
      </Grid>
    </Grid>
  );
}

BasicTable.defaultProps = {
  data: [],
};

BasicTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  size: PropTypes.string,
  loading: PropTypes.bool,
};

export default BasicTable;
