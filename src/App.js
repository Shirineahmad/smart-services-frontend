import { Routes, Route } from "react-router-dom";
// import HomePage from "../src/pages/HomePage"
import ApplyPage from "./pages/ApplyPage";

function App() {
  return (
    <Routes>
    
      {/* <Route path="/" element={<HomePage />} /> */}
      <Route path="/" element={<ApplyPage />} />
  
    </Routes>
  );
}

export default App;
