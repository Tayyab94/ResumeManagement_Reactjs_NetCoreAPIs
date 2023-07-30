import { useState, useEffect } from "react";
import { ICreateCandidatedto, IJobs } from "../../types/global.typing";
import TextField from "@mui/material/TextField/TextField";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import "./Addcandidate.scss";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import httpModule from "../../helpers/http.module";

const AddCandidate = () => {
  const [candidate, setCandidate] = useState<ICreateCandidatedto>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    jobId: "",
    coverLetter: "",
  });

  const [resume, setResume] = useState<File | null>();

  const [jobs, setjobs] = useState<IJobs[]>([]);

  const redirect = useNavigate();

  useEffect(() => {
    httpModule
      .get("/Job/Get")
      .then((response) => {
        setjobs(response.data);
      })
      .catch((error) => {
        alert("error");

        console.log(error);
      });
  }, []);

  const handleSaveEvent = () => {
    console.log("Candidate data:" + candidate);

    console.log("resume :" + resume);
    if (
      candidate.firstName === "" ||
      candidate.lastName === "" ||
      candidate.email == "" ||
      candidate.phone === "" ||
      candidate.jobId == "" ||
      !resume
    ) {
      alert("Fill all fields");
      return false;
    }

    var id = String(candidate.jobId);
    const newCandidateFormData = new FormData();
    newCandidateFormData.append("FirstName", candidate.firstName);
    newCandidateFormData.append("LastName", candidate.lastName);
    newCandidateFormData.append("Email", candidate.email);
    newCandidateFormData.append("Phone", candidate.phone);
    newCandidateFormData.append("CoverLetter", candidate.coverLetter);
    newCandidateFormData.append("JobId", id);
    newCandidateFormData.append("PdfFile", resume);

    httpModule
      .post("/Candidate/Create", newCandidateFormData)
      .then((response) => redirect("/candidates"))
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
          <FormControl fullWidth className="joblevelddl">
            <InputLabel id="demo-simple-select-label">Jobs</InputLabel>
            <Select
              labelId={candidate.jobId}
              id={candidate.jobId}
              value={candidate.jobId}
              label="Job Level"
              onChange={(e) =>
                setCandidate({ ...candidate, jobId: e.target.value })
              }
            >
              {jobs.map((item) => {
                return (
                  <MenuItem key={item.id} value={item.id}>
                    {item.title}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <TextField
            sx={{ mr: 6 }}
            fullWidth
            id={candidate.firstName}
            autoComplete="off"
            value={candidate.firstName}
            label="First Name"
            variant="standard"
            onChange={(e) =>
              setCandidate({ ...candidate, firstName: e.target.value })
            }
          />

          <TextField
            sx={{ mr: 6 }}
            fullWidth
            id={candidate.lastName}
            autoComplete="off"
            value={candidate.lastName}
            label="Last Name"
            variant="standard"
            onChange={(e) =>
              setCandidate({ ...candidate, lastName: e.target.value })
            }
          />

          <TextField
            sx={{ mr: 6 }}
            fullWidth
            id={candidate.email}
            autoComplete="off"
            value={candidate.email}
            label="Email"
            variant="standard"
            onChange={(e) =>
              setCandidate({ ...candidate, email: e.target.value })
            }
          />

          <TextField
            sx={{ mr: 6 }}
            fullWidth
            id={candidate.phone}
            autoComplete="off"
            value={candidate.phone}
            label="Phone"
            variant="standard"
            onChange={(e) =>
              setCandidate({ ...candidate, phone: e.target.value })
            }
          />

          <TextField
            sx={{ mr: 6 }}
            fullWidth
            id={candidate.coverLetter}
            autoComplete="off"
            value={candidate.coverLetter}
            label="Cover Letter"
            variant="standard"
            multiline
            onChange={(e) =>
              setCandidate({ ...candidate, coverLetter: e.target.value })
            }
          />

          <input
            type="file"
            onChange={(e) =>
              setResume(e.target.files ? e.target.files[0] : null)
            }
          />
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

export default AddCandidate;
