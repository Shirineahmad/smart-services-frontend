import React from 'react'
import Container from "@mui/material/Container";
import { Grid,  } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
  const token = localStorage.getItem("token");
   
const SubmissionFlight = () => {
  const [submissions, setSubmission] = React.useState([]);
  const [status,setStatus]=React.useState("")
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

  const handle = async (event, submissionId) => {
    const newStatus = event.target.value;

    // Update the status in the local state
    setStatus((prevStatus) => ({
      ...prevStatus,
      [submissionId]: newStatus,
    }));

    try {
      const response = await axios.put(
        `http://localhost:8000/submissionFlight/update/${submissionId}`,
        { statusFlight: newStatus },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
  }

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const response = await axios.get(
          "http://127.0.01:8000/submissionFlight/getByUser/658f4da73a6841f3bcd1ba6f"
        );
        console.log("response.data", response.data.data);
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
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          
         
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>User Name</TableCell>
                  <TableCell>Leaving From</TableCell>
                  <TableCell>Going To</TableCell>
                  <TableCell>Class Flight</TableCell>
                  <TableCell>LeavingDate</TableCell>
                  <TableCell>ArrivingDate</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Comment</TableCell>
                  <TableCell>Applied Time</TableCell>
                  <TableCell>Person</TableCell>
                  <TableCell>Passport</TableCell>
                  <TableCell align="right">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {submissions.map((submission) => (
                  <TableRow key={submission._id}>
                    <TableCell>
                      {submission.userId.firstName}
                      {submission.userId.LastName}
                    </TableCell>
                    <TableCell>{submission.leavingFrom}</TableCell>
                    <TableCell>{submission.goingTo}</TableCell>
                    <TableCell>{submission.classFlight}</TableCell>
                    <TableCell>
                      {
                        new Date(submission.arrivingDate)
                          .toISOString()
                          .split("T")[0]
                      }
                    </TableCell>
                    <TableCell>
                      {
                        new Date(submission.leavingDate)
                          .toISOString()
                          .split("T")[0]
                      }
                    </TableCell>
                    <TableCell>{submission.type}</TableCell>
                    <TableCell>{submission.additionalComment}</TableCell>
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

                    {submission.passport && submission.passport.length > 0 && (
                      <TableCell>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            console.log("omar"); handleDownloadImages(
                              submission.passport,
                              "download"
                            )}
                          
                          }
                        >
                          Download Passport
                        </button>
                      </TableCell>
                    )}

                    <TableCell align="right">
                      <Select
                        displayEmpty
                        value={
                          status[submission._id] || submission.statusFlight
                        }
                        onChange={(event) => handle(event, submission._id)}
                        input={<OutlinedInput />}
                      >
                        <MenuItem value={submission.statusFlight} selected>
                          {submission.statusFlight}
                        </MenuItem>
                        <MenuItem value="request">request</MenuItem>
                        <MenuItem value="accept">accept</MenuItem>
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

export default SubmissionFlight