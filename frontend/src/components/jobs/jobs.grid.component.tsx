import React from "react";
import "./jobs.grid.scss";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { GridColDef } from "@mui/x-data-grid/models";
import moment from "moment";
import { IJobs } from "../../types/global.typing";

/* The `const columns` is an array of objects that defines the columns for the data grid component.
Each object represents a column and has properties such as `field`, `headerName`, and `width` that
define the field name, header name, and width of the column respectively. */
const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "title",
    headerName: "JOb Title",
    width: 200,
  },
  {
    field: "level",
    headerName: "Leven",
    width: 150,
  },
  {
    field: "companyName",
    headerName: "Company",
    width: 150,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
    renderCell: (params) => moment(params.row.createdAt).fromNow(),
  },
];

/* The `interface ICompaniesGridProps` is defining the props that can be passed to the `CompaniesGrid`
component. It specifies that the component expects a prop called `data` which is an array of objects
of type `ICompany`. */

interface IJobGridProps {
  data: IJobs[];
}
const JobsGrit = ({ data }: IJobGridProps) => {
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

export default JobsGrit;
