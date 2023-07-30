import React, { useState, useEffect } from "react";
import "./candidate.scss";
import { ICandidate } from "../../types/global.typing";
import httpModule from "../../helpers/http.module";
import { Button, CircularProgress } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CandidatesGrid from "../../components/candidates/candidates.grid.component";
const Candidate = () => {
  const [candidates, setCandidates] = useState<ICandidate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const redirect = useNavigate();

  useEffect(() => {
    setLoading(true);
    httpModule
      .get("/Candidate/Get")
      .then((response) => {
        setLoading(true);
        setCandidates(response.data);
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
          <h2>Candidates</h2>
          <Button
            variant="outlined"
            onClick={() => redirect("/candidates/add")}
          >
            <Add />
          </Button>
        </div>
        {loading ? (
          <CircularProgress size={100} />
        ) : candidates.length === 0 ? (
          <h2>No Candidate found</h2>
        ) : (
          <CandidatesGrid data={candidates} />
        )}
      </div>
    </>
  );
};

export default Candidate;
