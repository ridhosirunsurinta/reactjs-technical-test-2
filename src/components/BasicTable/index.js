import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DateTime } from "luxon";
import _ from "lodash";

function BasicTable(props) {
  const { columns, data, size, stickyHeader } = props;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size={size} stickyHeader={stickyHeader}>
        <TableHead>
          <TableRow>
            {columns.map((col) => {
              return (
                <TableCell key={col.label} align={col.align}>
                  {col.label}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{row.login.username}</TableCell>
              <TableCell align="center">{`${row.name.first} ${row.name.last}`}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{_.startCase(row.gender)}</TableCell>
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
