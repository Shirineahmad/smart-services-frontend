import React from 'react'
import Container from "@mui/material/Container";
import { Grid, Paper } from "@mui/material";
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
console.log("token",token)
   
const SubmissionExamDash = () => {
  const [submissions, setSubmission] = React.useState([]);
  const [status, setStatus] = React.useState("");
  const handleDownloadImages = (imageUrls, downloadFileName) => {
    if (imageUrls && imageUrls.length > 0) {
      const links = imageUrls.map((imageUrl, index) => ({
        href: imageUrl,
        download: `${downloadFileName}_${index + 1}.png`,
      }));

      // Create links and append them to the document
      links.forEach((linkInfo) => {
        const link = document.createElement("a");
        link.href = linkInfo.href;
        link.download = linkInfo.download;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    } else {
      console.error("Passport images not available for download.");
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
        `http://localhost:8000/submissionExam/update/${submissionId}`,
        { statusExam: newStatus },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response after update request Exam:", response);
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
          "http://127.0.01:8000/submissionExam/getAll"
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
                <TableCell>Phone Number</TableCell>
                <TableCell>Urgent Number</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Language</TableCell>
                <TableCell>Insitute</TableCell>
                <TableCell>Level</TableCell>
                <TableCell>Tail</TableCell>
                <TableCell>Comment</TableCell>
                <TableCell>Passport</TableCell>
                <TableCell>Apply Date</TableCell>
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
                  <TableCell>{submission.userId.phoneNumber}</TableCell>
                  <TableCell>{submission.urgentNumber}</TableCell>
                  <TableCell>{submission.userId.email}</TableCell>
                  <TableCell>{submission.examId.language}</TableCell>
                  <TableCell>{submission.examId.institute}</TableCell>
                  <TableCell>{submission.examId.level}</TableCell>
                  <TableCell>{submission.examId.description}</TableCell>
                  <TableCell>{submission.additionalComment}</TableCell>

                  {submission.passport && submission.passport.length > 0 && (
                    <TableCell>
                      <button
                        onClick={() =>
                          handleDownloadImages(submission.passport, "download")
                        }
                      >
                        Download Passport
                      </button>
                    </TableCell>
                  )}
                  <TableCell>
                    {new Date(submission.createdAt).toISOString().split("T")[0]}
                  </TableCell>

                  <TableCell align="right">
                    <Select
                      displayEmpty
                      value={status[submission._id] || submission.statusExam}
                      onChange={(event) => handle(event, submission._id)}
                      input={<OutlinedInput />}
                    >
                      <MenuItem value={submission.statusExam} selected>
                        {submission.statusExam}
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



export default SubmissionExamDash