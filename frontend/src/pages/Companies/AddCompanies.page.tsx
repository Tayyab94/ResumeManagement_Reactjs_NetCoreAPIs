import React, { useState } from "react";
import { ICreateCompanyDto } from "../../types/global.typing";
import TextField from "@mui/material/TextField/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import "./AddCompanies.scss";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import httpModule from "../../helpers/http.module";

const AddCompanies = () => {
  const [company, setCompany] = useState<ICreateCompanyDto>({
    name: "",
    size: "",
  });
  const redirect = useNavigate();

  const handleSaveEvent = () => {
    if (company.name === "" || company.size === "") {
      alert("Fill all fields");
      return false;
    }

    httpModule
      .post("/company/Create", company)
      .then((response) => redirect("/companies"))
      .catch((error) => {
        alert("Something wrong");
        console.log(error);
      });
  };

  return (
    <div className="content">
      <div className="add-company">
        <h2>Add Company</h2>
        <div className="companyForm">
          <TextField
            sx={{ mr: 6 }}
            fullWidth
            id={company.name}
            autoComplete="off"
            value={company.name}
            label="Company Name"
            variant="standard"
            onChange={(e) => setCompany({ ...company, name: e.target.value })}
          />
          <FormControl fullWidth className="Comapnyddl">
            <InputLabel id="demo-simple-select-label">Size</InputLabel>
            <Select
              labelId={company.size}
              id={company.size}
              value={company.size}
              label="Company Size"
              onChange={(e) => setCompany({ ...company, size: e.target.value })}
            >
              <MenuItem value={"small"}>Small</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="large">Large</MenuItem>
            </Select>
          </FormControl>
        </div>

        <Button variant="outlined" onClick={handleSaveEvent}>
          Save
        </Button>
        <Button variant="outlined" onClick={() => redirect("/companies")}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default AddCompanies;
