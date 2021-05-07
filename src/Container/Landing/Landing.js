import { useCallback, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import {
  TextField,
  TableRow,
  TablePagination,
  Box,
  Button,
} from "@material-ui/core";
import Fetch from "../../Utils/Fetch";
import { VEHICLE_QUERY } from "../../Api";

const columns = [
  { id: "bike_id", label: "ID", minWidth: 170 },
  {
    id: "is_disabled",
    label: "Disabled",
    minWidth: 100,
    format: (value) => (value === "0" ? "No" : "Yes"),
  },
  {
    id: "is_reserved",
    label: "Reversed",
    minWidth: 170,
    align: "right",
    format: (value) => (value === "0" ? "No" : "Yes"),
  },
  {
    id: "lat",
    label: "Latitutde",
    minWidth: 170,
    align: "right",
  },
  {
    id: "lon",
    label: "Longitude",
    minWidth: 170,
    align: "right",
  },
  {
    id: "vehicle_type",
    label: "Type",
    minWidth: 170,
    align: "right",
  },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  searchWrapper: {},
});

export default function Landing() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [vehicle, setVehicle] = useState([]);
  const [search, setSearch] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const getVehicle = useCallback(async ({ id } = {}) => {
    const { Vehicle } = await Fetch({
      query: VEHICLE_QUERY,
      variables: { id },
    });
    setVehicle(Vehicle);
  }, []);

  const handleSearchChange = useCallback(({ target: { value } }) => {
    setSearch(value);
  }, []);

  const handleSearch = useCallback(
    (event) => {
      getVehicle({ id: search });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [search]
  );

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    getVehicle();
  }, []);

  return (
    <Paper className={classes.root}>
      <Box
        flexDirection='row'
        justifyContent='flex-end'
        alignItems='center'
        width='100%'
        component='div'
        display='flex'
        gridGap='10'
      >
        <Box marginRight={5}>
          <TextField
            id='outlined-error'
            label='Filter by ID'
            variant='outlined'
            onChange={handleSearchChange}
          />
        </Box>

        <Button variant='contained' onClick={handleSearch}>
          filter
        </Button>
      </Box>

      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicle
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role='checkbox'
                    tabIndex={-1}
                    key={row.bike_id}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={vehicle.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
