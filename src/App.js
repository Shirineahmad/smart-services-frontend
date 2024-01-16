import { Routes, Route } from "react-router-dom";
import HomePage from "../src/pages/HomePage";
// import ApplyPage from "./pages/ApplyPage";

import DashBoard from "./pages/Dashboard"
import SignIn from "./pages/SignIn";
import SignUP from "./pages/SignUp";
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/" element={<ApplyPage />} /> */}
     
      <Route path="/*" element={<DashBoard />} />
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/SignUp" element={<SignUP />} />
    </Routes>
  );
}

export default App;
