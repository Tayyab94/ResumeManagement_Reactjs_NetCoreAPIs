import React from "react";
import "./companies.grid.scss";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { GridColDef } from "@mui/x-data-grid/models";
import moment from "moment";
import { ICompany } from "../../types/global.typing";

/* The `const columns` is an array of objects that defines the columns for the data grid component.
Each object represents a column and has properties such as `field`, `headerName`, and `width` that
define the field name, header name, and width of the column respectively. */

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "name",
    headerName: "Company Name",
    width: 200,
  },
  {
    field: "size",
    headerName: "Company Size",
    width: 150,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
    renderCell: (params) => moment(params.row.createdAt).format("YYYY-MM-DD"),
  },
];

/* The `interface ICompaniesGridProps` is defining the props that can be passed to the `CompaniesGrid`
component. It specifies that the component expects a prop called `data` which is an array of objects
of type `ICompany`. */
interface ICompaniesGridProps {
  data: ICompany[];
}

const CompaniesGrit = ({ data }: ICompaniesGridProps) => {
  return (
    <div>
      <Box sx={{ height: 400, width: "100%" }} className="companies-grid">
        <DataGrid
          columns={columns}
          rows={data}
          getRowId={(row) => row.id}
          rowHeight={50}
        />
      </Box>
    </div>
  );
};

export default CompaniesGrit;
