import "./candidates.grid.scss";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { GridColDef } from "@mui/x-data-grid/models";
import { ICandidate } from "../../types/global.typing";
import { baseUrl } from "../../constants/url.constant";
import { PictureAsPdf } from "@mui/icons-material";
/* The `const columns` is an array of objects that defines the columns for the data grid component.
Each object represents a column and has properties such as `field`, `headerName`, and `width` that
define the field name, header name, and width of the column respectively. */
const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "firstName",
    headerName: "First Name",
    width: 200,
  },
  {
    field: "lastName",
    headerName: "Last Name",
    width: 150,
  },
  {
    field: "email",
    headerName: "Email",
    width: 150,
  },

  {
    field: "phone",
    headerName: "Phone",
    width: 200,
  },
  {
    field: "coverLetter",
    headerName: "Cover Letter",
    width: 150,
  },
  {
    field: "jobTitle",
    headerName: "Job Litle",
    width: 150,
  },
  {
    field: "resumeUrl",
    headerName: "CV/Resume",
    width: 200,
    renderCell: (params) => (
      <a href={`${baseUrl}/Candidate/download/${params.row.resumeUrl}`}>
        <PictureAsPdf />
      </a>
    ),
  },
];

/* The `interface ICompaniesGridProps` is defining the props that can be passed to the `CompaniesGrid`
component. It specifies that the component expects a prop called `data` which is an array of objects
of type `ICompany`. */

interface ICandidteGridProps {
  data: ICandidate[];
}
const CandidatesGrid = ({ data }: ICandidteGridProps) => {
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

export default CandidatesGrid;
