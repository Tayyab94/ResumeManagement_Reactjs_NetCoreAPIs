import React, { useState, useEffect } from "react";
import "./company.scss";
import { ICompany } from "../../types/global.typing";
import httpModule from "../../helpers/http.module";
import { Button, CircularProgress } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CompaniesGrit from "../../components/companies/companies.grid.component";

const Companies = () => {
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const redirect = useNavigate();

  useEffect(() => {
    setLoading(true);
    httpModule
      .get("/Company/Get")
      .then((response) => {
        setLoading(true);
        setCompanies(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert("error");
        setLoading(false);
        console.log(error);
      });
  }, []);
  console.log(companies);

  return (
    <>
      <div className="content companies">
        <div className="heading">
          <h2>Companies</h2>
          <Button variant="outlined" onClick={() => redirect("/companies/add")}>
            <Add />
          </Button>
        </div>
        {loading ? (
          <CircularProgress size={100} />
        ) : companies.length === 0 ? (
          <h2>No Companies found</h2>
        ) : (
          <CompaniesGrit data={companies} />
        )}
      </div>
    </>
  );
};

export default Companies;
