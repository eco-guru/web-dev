import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "role",
    headerName: "Role",
    width: 160,
    type: "singleSelect",
    valueOptions: ["admin", "user", "educator", "waste collector"],
  },
  { field: "username", headerName: "Username", width: 130 },
  { field: "phone", headerName: "Phone", width: 130 },
  { field: "address", headerName: "Address", width: 200 },
];

const rows = [
  {
    id: 1,
    role: "admin",
    username: "jon_snow",
    phone: "123456789",
    address: "Winterfell",
  },
  {
    id: 2,
    role: "user",
    username: "cersei_l",
    phone: "987654321",
    address: "King's Landing",
  },
  {
    id: 3,
    role: "educator",
    username: "jaime_l",
    phone: "543216789",
    address: "Casterly Rock",
  },
  {
    id: 4,
    role: "waste collector",
    username: "arya_stark",
    phone: "112233445",
    address: "Winterfell",
  },
  {
    id: 5,
    role: "user",
    username: "daenerys_t",
    phone: "778899001",
    address: "Dragonstone",
  },
  {
    id: 6,
    role: "admin",
    username: "melisandre",
    phone: "666666666",
    address: "Asshai",
  },
  {
    id: 7,
    role: "educator",
    username: "ferrara_c",
    phone: "777777777",
    address: "Pentos",
  },
  {
    id: 8,
    role: "waste collector",
    username: "rossini_f",
    phone: "888888888",
    address: "Braavos",
  },
  {
    id: 9,
    role: "user",
    username: "harvey_r",
    phone: "999999999",
    address: "Meereen",
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{
          border: 0,
          "& .MuiDataGrid-cell": {
            fontSize: "1.2rem", // Mengubah ukuran font pada cell
          },
          "& .MuiDataGrid-columnHeaders": {
            fontSize: "1.4rem", // Mengubah ukuran font pada header
          },
        }}
      />
    </Paper>
  );
}
