import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Routes,Route,useNavigate} from "react-router-dom";
import SubmissionExamDash from "../components/dashboardComponents/SubmissionExamDash";
import SubmissionFlight from "../components/dashboardComponents/SubmissionFlight";
import SubmissionVisa from "../components/dashboardComponents/SubmissionVisa";
import UserData from  "../components/dashboardComponents/UserData";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

// ... (imports remain the same)

export default function AdminDashboard() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);

    // Use the navigate function to change the route based on the tab index
    switch (newValue) {
      case 0:
        navigate("/submissionExamDash");
        break;
      case 1:
        navigate("/submissionFlight");
        break;
      case 2:
        navigate("/submissionVisa");
        break;
      case 3:
        navigate("/userData");
        break;
      default:
        break;
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: "100%",
      }}
    >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider", height: "100%" }}
      >
        <Tab label="submissionExam" {...a11yProps(0)} />
        <Tab label="submissionFlight" {...a11yProps(1)} />
        <Tab label="submissionVisa" {...a11yProps(2)} />
        <Tab label="userData" {...a11yProps(3)} />
      </Tabs>

      <Routes>
        <Route
          path="/submissionExamDash"
          element={
            <TabPanel value={value} index={0}>
              <SubmissionExamDash />
            </TabPanel>
          }
        />
        <Route
          path="/submissionFlight"
          element={
            <TabPanel value={value} index={1}>
              <SubmissionFlight />
            </TabPanel>
          }
        />
        <Route
          path="/submissionVisa"
          element={
            <TabPanel value={value} index={2}>
              <SubmissionVisa />
            </TabPanel>
          }
        />
        <Route
          path="/userData"
          element={
            <TabPanel value={value} index={3}>
              <UserData />
            </TabPanel>
          }
        />
      </Routes>
    </Box>
  );
}
