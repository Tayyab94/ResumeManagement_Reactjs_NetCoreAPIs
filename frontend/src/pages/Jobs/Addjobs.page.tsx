import React, { useState, useEffect } from "react";
import { ICompany, ICreateJobsDto } from "../../types/global.typing";
import TextField from "@mui/material/TextField/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import "./Addjobs.scss";
import { Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import httpModule from "../../helpers/http.module";

const joblevel: string[] = [
  "Intern",
  "Junior",
  "MidLevel",
  "Senior",
  "TeamLead",
  "Cto",
  "Architect",
];

const AddJob = () => {
  const [job, setJob] = useState<ICreateJobsDto>({
    title: "",
    level: "",
    companyId: "",
  });

  const [companies, setCompanies] = useState<ICompany[]>([]);

  const redirect = useNavigate();

  useEffect(() => {
    httpModule
      .get("/Company/Get")
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        alert("error");

        console.log(error);
      });
  }, []);
  const handleSaveEvent = () => {
    if (job.title === "" || job.level === "" || job.companyId == "") {
      alert("Fill all fields");
      return false;
    }

    httpModule
      .post("/Job/Create", job)
      .then((response) => redirect("/Jobs"))
      .catch((error) => {
        alert("Something wrong");
        console.log(error);
      });
  };

  return (
    <div className="content">
      <div className="add-company">
        <h2>Add Job</h2>
        <div className="companyForm">
          <TextField
            sx={{ mr: 6 }}
            fullWidth
            id={job.title}
            autoComplete="off"
            value={job.title}
            label="Job title"
            variant="standard"
            onChange={(e) => setJob({ ...job, title: e.target.value })}
          />

          <FormControl fullWidth className="joblevelddl">
            <InputLabel id="demo-simple-select-label">Job Level</InputLabel>
            <Select
              labelId={job.level}
              id={job.level}
              value={job.level}
              label="Job Level"
              onChange={(e) => setJob({ ...job, level: e.target.value })}
            >
              {joblevel.map((item) => {
                return (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <FormControl fullWidth className="joblevelddl">
            <InputLabel id="demo-simple-select-label">Conpany</InputLabel>
            <Select
              labelId={job.companyId}
              id={job.companyId}
              value={job.companyId}
              label="Select Company"
              onChange={(e) => setJob({ ...job, companyId: e.target.value })}
            >
              {companies.map((item) => {
                return (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>

        <Button variant="outlined" onClick={handleSaveEvent}>
          Save
        </Button>
        <Button variant="outlined" onClick={() => redirect("/jobs")}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default AddJob;
