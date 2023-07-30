import React, { useState, useEffect } from "react";
import "./jobs.scss";
import { IJobs } from "../../types/global.typing";
import httpModule from "../../helpers/http.module";
import { Button, CircularProgress } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import JobsGrit from "../../components/jobs/jobs.grid.component";
const Jobs = () => {
  const [jobs, setJobs] = useState<IJobs[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const redirect = useNavigate();

  useEffect(() => {
    setLoading(true);
    httpModule
      .get("/job/Get")
      .then((response) => {
        setLoading(true);
        setJobs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert("error");
        setLoading(false);
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="content companies">
        <div className="heading">
          <h2>Jobs</h2>
          <Button variant="outlined" onClick={() => redirect("/jobs/add")}>
            <Add />
          </Button>
        </div>
        {loading ? (
          <CircularProgress size={100} />
        ) : jobs.length === 0 ? (
          <h2>No Companies found</h2>
        ) : (
          <JobsGrit data={jobs} />
        )}
      </div>
    </>
  );
};

export default Jobs;
