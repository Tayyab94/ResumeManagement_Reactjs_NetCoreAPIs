import React, { useContext, lazy, Suspense } from "react";
import { ThemeContext } from "./context/theme.contact";
import Navbar from "./components/Navbar/Navbar.component";
import { Route, Routes } from "react-router-dom";
import CustomLinear from "./components/custom-liner-progress/customLinear-Programm";
import Jobs from "./pages/Jobs/jobs.page";
import AddJob from "./pages/Jobs/Addjobs.page";

import AddCandidate from "./pages/candidates/Addcandidate.page";

const Home = lazy(() => import("./pages/Home/home.page"));
const Companies = lazy(() => import("./pages/Companies/companies.page"));
const AddCompanies = lazy(() => import("./pages/Companies/AddCompanies.page"));
const Candidate = lazy(() => import("./pages/candidates/candidate.page"));
function App() {
  const { darkMode } = useContext(ThemeContext);
  // console.log(darkMode);
  const appStyle = darkMode ? "app dark" : "app";
  return (
    <div className={appStyle}>
      <Navbar />
      <Suspense fallback={<CustomLinear />}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/companies">
            <Route index element={<Companies />} />
            <Route path="add" element={<AddCompanies />} />
          </Route>
          <Route path="/jobs">
            <Route index element={<Jobs />} />
            <Route path="add" element={<AddJob />} />
          </Route>
          <Route path="/candidates">
            <Route index element={<Candidate />} />
            <Route path="add" element={<AddCandidate />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
