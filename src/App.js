import { Routes, Route } from "react-router-dom";
// import HomePage from "../src/pages/HomePage"
import ApplyPage from "./pages/ApplyPage";
// import AdminDashboard from "./pages/AdminDashboard";
function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<HomePage />} /> */}
      <Route path="/" element={<ApplyPage />} />
      {/* <Route path="/*" element={<AdminDashboard />} /> */}
    </Routes>
  );
}

export default App;
