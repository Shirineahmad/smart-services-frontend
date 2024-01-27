import React from "react";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  OutlinedInput,
  Button,
  TextField,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import { useEffect } from "react";
import axios from "axios";


const SubmissionVisa = () => {
  const [submissions, setSubmission] = React.useState([]);
  const [status, setStatus] = React.useState("");
  const [resultSearch, setResultSearch] = React.useState([]);
  const [showSearch, setShowSearch] = React.useState(false);
  const [alert, setAlert] = React.useState(false);
  const [searchName, setSearchName] = React.useState("");
  const token = localStorage.getItem("token");
  const handleDownloadImages = (pdfUrls, downloadFileName) => {
    if (pdfUrls && pdfUrls.length > 0) {
      const links = pdfUrls.map((pdfUrl, index) => ({
        href: pdfUrl,
        download: `${downloadFileName}_${index + 1}.pdf`,
      }));

      links.forEach((linkInfo) => {
        const link = document.createElement("a");
        link.href = linkInfo.href;
        link.target = "_blank";
        link.download = linkInfo.download;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    } else {
      console.error("PDF files not available for download.");
    }
  };
  const searchUser = (e) => {
    e.preventDefault();
    setShowSearch(true);

    const result = submissions.filter((submission) => {
      const userFirstName = (submission.userId.firstName || "").toLowerCase();
      const userLastName = (submission.userId.lastName || "").toLowerCase();

      const [searchFirstName, searchLastName] = searchName
        .toLowerCase()
        .split(" ");

      return (
        userFirstName.includes(searchFirstName) ||
        userFirstName.includes(searchLastName) ||
        userLastName.includes(searchFirstName) ||
        userLastName.includes(searchLastName)
      );
    });

    setResultSearch(result);
  };
  const handle = async (event, submissionId) => {
    const newStatus = event.target.value;

    // Update the status in the local state immutably
    setStatus((prevStatus) => {
      // Find the submission with the matching ID and update its status
      const updatedStatus = { ...prevStatus };
      updatedStatus[submissionId] = newStatus;
      return updatedStatus;
    });
    try {
      const response = await axios.put(
        `https://smart-services-backend-test5.onrender.com/submissionVisa/update/${submissionId}`,
        { statusVisa: newStatus },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 5000); // Hide alert after 5 seconds
      }
      console.log("Response after update request:", response);
      console.log("Order updated successfully");
    } catch (error) {
      if (error.response) {
        console.error("Server responded with an error:", error.response.data);
        console.error("Status code:", error.response.status);
        console.error("Headers:", error.response.headers);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }
    }
  };

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const response = await axios.get(
          `https://smart-services-backend-test5.onrender.com/submissionVisa/getAll`
        );
        console.log("response.data viss", response.data.data);
        if (response.data.success) {
          setSubmission(response.data.data);
        } else {
          console.error("Error fetching products:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };

    fetchSubmission();
  }, []);
  console.log("submission", submissions);
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, ml: 0 }}>
      <form onSubmit={searchUser}>
        <div
          className="flex justify-end pb-6 pt-1"
          x-data="{ search: '' }"
          onClick={() => setShowSearch(false)}
        >
          <TextField
            label="Search for User"
            variant="outlined"
            size="small"
            onChange={(e) => setSearchName(e.target.value.toLowerCase())}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={!searchName}
            style={{
              marginLeft: "8px",
              color: "white",
              backgroundColor: "#DF2E38",
              "&:hover": {
                backgroundColor: "#5D9C59", // Change to the desired hover color
              },
            }}
          >
            Search
          </Button>
          {alert && <Alert severity="success">Updated Successfully</Alert>}
        </div>
      </form>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>User Name</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Visa Type</TableCell>
                <TableCell>Applied Time</TableCell>
                <TableCell>Person</TableCell>
                <TableCell>documents file</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {showSearch
                ? resultSearch.map((submission) => (
                    <TableRow key={submission._id}>
                      <TableCell>
                        {submission.userId.firstName}
                        {submission.userId.LastName}
                      </TableCell>
                      <TableCell>{submission.userId.phoneNumber}</TableCell>
                      <TableCell>{submission.visaId.country}</TableCell>
                      <TableCell>{submission.visaId.title}</TableCell>
                      <TableCell>
                        {
                          new Date(submission.createdAt)
                            .toISOString()
                            .split("T")[0]
                        }
                      </TableCell>
                      {submission.person && submission.person.Adult > 0 && (
                        <TableCell>
                          Adult:{submission.person.Adult} Child:
                          {submission.person.child} Infant:
                          {submission.person.infant}
                        </TableCell>
                      )}
                      {submission.documents &&
                        submission.documents.length > 0 &&
                        submission.documents.map((doc, index) => (
                          <TableCell key={index}>
                            {doc.name}
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                handleDownloadImages(doc.file);
                              }}
                            >
                              Download Passport
                            </button>
                          </TableCell>
                        ))}

                      <TableCell align="right">
                        <Select
                          value={
                            status[submission._id] || submission.statusVisa
                          }
                          onChange={(event) => handle(event, submission._id)}
                          input={<OutlinedInput />}
                        >
                          {submission.statusVisa === "pending" && [
                            <MenuItem
                              key="pending"
                              value={submission.statusVisa}
                              selected
                            >
                              {submission.statusVisa}
                            </MenuItem>,
                            <MenuItem key="request" value="request">
                              Request
                            </MenuItem>,
                            <MenuItem key="accept" value="accept">
                              Accept
                            </MenuItem>,
                          ]}
                          {submission.statusVisa === "request" && [
                            <MenuItem key="pending" value="pending">
                              Pending
                            </MenuItem>,
                            <MenuItem
                              key="request"
                              value={submission.statusVisa}
                              selected
                            >
                              {submission.statusVisa}
                            </MenuItem>,
                            <MenuItem key="accept" value="accept">
                              Accept
                            </MenuItem>,
                          ]}
                          {submission.statusVisa === "accept" && [
                            <MenuItem key="pending" value="pending">
                              Pending
                            </MenuItem>,
                            <MenuItem key="request" value="request">
                              Request
                            </MenuItem>,
                            <MenuItem
                              key="accept"
                              value={submission.statusVisa}
                              selected
                            >
                              {submission.statusVisa}
                            </MenuItem>,
                          ]}
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))
                : submissions.map((submission) => (
                    <TableRow key={submission._id}>
                      <TableCell>
                        {submission.userId.firstName}
                        {submission.userId.LastName}
                      </TableCell>
                      <TableCell>{submission.userId.phoneNumber}</TableCell>
                      <TableCell>{submission.visaId.country}</TableCell>
                      <TableCell>{submission.visaId.title}</TableCell>
                      <TableCell>
                        {
                          new Date(submission.createdAt)
                            .toISOString()
                            .split("T")[0]
                        }
                      </TableCell>

                      {submission.person && submission.person.Adult > 0 && (
                        <TableCell>
                          Adult:{submission.person.Adult} Child:
                          {submission.person.child} Infant:
                          {submission.person.infant}
                        </TableCell>
                      )}

                      {submission.documents &&
                        submission.documents.length > 0 &&
                        submission.documents.map((doc, index) => (
                          <TableCell key={index}>
                            {doc.name}
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                handleDownloadImages(doc.file);
                              }}
                            >
                              Download Passport
                            </button>
                          </TableCell>
                        ))}

                      <TableCell align="right">
                        <Select
                          displayEmpty
                          value={
                            status[submission._id] || submission.statusVisa
                          }
                          onChange={(event) => handle(event, submission._id)}
                          input={<OutlinedInput />}
                        >
                          {submission.statusVisa === "pending" && [
                            <MenuItem
                              key="pending"
                              value={submission.statusVisa}
                              selected
                            >
                              {submission.statusVisa}
                            </MenuItem>,
                            <MenuItem key="request" value="request">
                              Request
                            </MenuItem>,
                            <MenuItem key="accept" value="accept">
                              Accept
                            </MenuItem>,
                          ]}
                          {submission.statusVisa === "request" && [
                            <MenuItem key="pending" value="pending">
                              Pending
                            </MenuItem>,
                            <MenuItem key="request" value="request" selected>
                              {submission.statusVisa}
                            </MenuItem>,
                            <MenuItem key="accept" value="accept">
                              Accept
                            </MenuItem>,
                          ]}
                          {submission.statusVisa === "accept" && [
                            <MenuItem key="pending" value="pending">
                              Pending
                            </MenuItem>,
                            <MenuItem key="request" value="request">
                              Request
                            </MenuItem>,
                            <MenuItem key="accept" value="accept" selected>
                              {submission.statusVisa}
                            </MenuItem>,
                          ]}
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SubmissionVisa;
