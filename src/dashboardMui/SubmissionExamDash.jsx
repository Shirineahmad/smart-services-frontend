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
import { useEffect } from "react";
import axios from "axios";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import Alert from "@mui/material/Alert";




const SubmissionExamDash = () => {
  const [submissions, setSubmission] = React.useState([]);
  const [status, setStatus] = React.useState("");
  const [searchName, setSearchName] = React.useState("");
  const [resultSearch, setResultSearch] = React.useState([]);
  const [showSearch, setShowSearch] = React.useState(false);
  const [alert, setAlert] = React.useState(false);
  const token = localStorage.getItem("token");

  // const downloadFiles = async (filePaths, fileName = "pdfs") => {
  //   const promises = filePaths.map(async (filePath) => {
  //     try {
  //       const storageRef = ref(storage, filePath);
  //       const downloadURL = await getDownloadURL(storageRef);

  //       const link = document.createElement("a");
  //       link.href = downloadURL;
  //       link.download = fileName;

  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link);

  //       return Promise.resolve();
  //     } catch (error) {
  //       console.error("Error downloading file:", error);
  //       return Promise.reject(error);
  //     }
  //   });

  //   try {
  //     await Promise.all(promises);
  //     console.log("All files downloaded successfully");
  //   } catch (error) {
  //     console.error("Error downloading files:", error);
  //   }
  // };

  const downloadFiles = async (filePaths, fileName = "pdfs") => {
    const promises = filePaths.map(async (filePath) => {
      try {
        const downloadURL = await getDownloadURL(ref(storage, filePath));

        console.log("Download URL:", downloadURL); // Log the download URL

        const link = document.createElement("a");
        link.target = "_blank";
        link.href = downloadURL;
        link.download = fileName;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        return Promise.resolve();
      } catch (error) {
        console.error("Error downloading file:", error);
        return Promise.reject(error);
      }
    });

    try {
      await Promise.all(promises);
      console.log("All files downloaded successfully");
    } catch (error) {
      console.error("Error downloading files:", error);
    }
  };

  // const handleDownloadImages = (imageUrls, downloadFileName) => {
  //   if (imageUrls && imageUrls.length > 0) {
  //     const links = imageUrls.map((imageUrl, index) => ({
  //       href: imageUrl,
  //       download: `${downloadFileName}_${index + 1}.png`,
  //     }));

  //     // Create links and append them to the document
  //     links.forEach((linkInfo) => {
  //       const link = document.createElement("a");
  //       link.href = linkInfo.href;
  // link.target = "_blank";
  //       link.download = linkInfo.download;
  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link);
  //     });
  //   } else {
  //     console.error("Passport images not available for download.");
  //   }
  // };
  const searchUser = (e) => {
    e.preventDefault();
    setShowSearch(true);

    const result = submissions.filter((submission) => {
      const userFirstName = (submission.userI?.firstName || "").toLowerCase();
      const userLastName = (submission.userId?.lastName || "").toLowerCase();

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

    // Update the status in the local state
    setStatus((prevStatus) => {
      // Find the submission with the matching ID and update its status
      const updatedStatus = { ...prevStatus };
      updatedStatus[submissionId] = newStatus;
      return updatedStatus;
    });

    try {
      const response = await axios.put(
        `https://smart-services-backend-test5.onrender.com/submissionExam/update/${submissionId}`,
        { statusExam: newStatus },
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
          `https://smart-services-backend-test5.onrender.com/submissionExam/getAll`
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
        </div>
        {alert && <Alert severity="success">Updated Successfully</Alert>}
      </form>
     
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
              {showSearch
                ?resultSearch&& resultSearch.map((submission) => (
                    <TableRow key={submission._id}>
                      <TableCell>
                        {submission.userId?.firstName}
                        {submission.userId?.LastName}
                      </TableCell>
                      <TableCell>{submission.userId?.phoneNumber}</TableCell>
                      <TableCell>{submission.urgentNumber}</TableCell>
                      <TableCell>{submission.userId?.email}</TableCell>
                      <TableCell>{submission.language}</TableCell>
                      <TableCell>{submission.institute}</TableCell>
                      <TableCell>{submission.level}</TableCell>
                      <TableCell>{submission.description}</TableCell>
                      <TableCell>{submission.additionalComment}</TableCell>

                      {submission.passport &&
                        submission.passport.length > 0 && (
                          <TableCell>
                            <button
                              onClick={() => downloadFiles(submission.passport)}
                            >
                              Download Files
                            </button>
                          </TableCell>
                        )}
                      <TableCell>
                        {
                          new Date(submission.createdAt)
                            .toISOString()
                            .split("T")[0]
                        }
                      </TableCell>

                      <TableCell align="right">
                        <Select
                          displayEmpty
                          value={
                            status[submission._id] || submission.statusExam
                          }
                          onChange={(event) => handle(event, submission._id)}
                          input={<OutlinedInput />}
                        >
                          {submission.statusExam === "pending" && [
                            <MenuItem value={submission.statusExam} selected>
                              {submission.statusExam}
                            </MenuItem>,
                            <MenuItem key="request" value="request">
                              Request
                            </MenuItem>,
                            <MenuItem key="accept" value="accept">
                              Accept
                            </MenuItem>,
                          ]}
                          {submission.statusExam === "request" && [
                            <MenuItem key="pending" value="pending">
                              Pending
                            </MenuItem>,
                            <MenuItem key="request" value="request" selected>
                              {submission.statusExam}
                            </MenuItem>,
                            <MenuItem key="accept" value="accept">
                              Accept
                            </MenuItem>,
                          ]}
                          {submission.statusExam === "accept" && [
                            <MenuItem key="pending" value="pending">
                              Pending
                            </MenuItem>,
                            <MenuItem key="request" value="request">
                              Request
                            </MenuItem>,
                            <MenuItem key="accept" value="accept" selected>
                              {submission.statusExam}
                            </MenuItem>,
                          ]}
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))
                :submissions && submissions.map((submission) => (
                    <TableRow key={submission._id}>
                      <TableCell>
                        {submission.userId?.firstName}
                        {submission.userId?.LastName}
                      </TableCell>
                      <TableCell>{submission.userId?.phoneNumber}</TableCell>
                      <TableCell>{submission.urgentNumber}</TableCell>
                      <TableCell>{submission.userId?.email}</TableCell>
                      <TableCell>{submission.language}</TableCell>
                      <TableCell>{submission.institute}</TableCell>
                      <TableCell>{submission.level}</TableCell>
                      <TableCell>{submission.description}</TableCell>
                      <TableCell>{submission.additionalComment}</TableCell>

                      {submission.passport &&
                        submission.passport.length > 0 && (
                          <TableCell>
                            <button
                              onClick={() =>
                                downloadFiles(submission.passport, "download")
                              }
                            >
                              Download Passport
                            </button>
                          </TableCell>
                        )}
                      <TableCell>
                        {
                          new Date(submission.createdAt)
                            .toISOString()
                            .split("T")[0]
                        }
                      </TableCell>

                      <TableCell align="right">
                        <Select
                          displayEmpty
                          value={
                            status[submission._id] || submission.statusExam
                          }
                          onChange={(event) => handle(event, submission._id)}
                          input={<OutlinedInput />}
                        >
                          {submission.statusExam === "pending" && [
                            <MenuItem
                              key="pending"
                              value={submission.statusExam}
                              selected
                            >
                              {submission.statusExam}
                            </MenuItem>,
                            <MenuItem key="request" value="request">
                              Request
                            </MenuItem>,
                            <MenuItem key="accept" value="accept">
                              Accept
                            </MenuItem>,
                          ]}
                          {submission.statusExam === "request" && [
                            <MenuItem key="pending" value="pending">
                              Pending
                            </MenuItem>,
                            <MenuItem key="request" value="request" selected>
                              {submission.statusExam}
                            </MenuItem>,
                            <MenuItem key="accept" value="accept">
                              Accept
                            </MenuItem>,
                          ]}
                          {submission.statusExam === "accept" && [
                            <MenuItem key="pending" value="pending">
                              Pending
                            </MenuItem>,
                            <MenuItem key="request" value="request">
                              Request
                            </MenuItem>,
                            <MenuItem key="accept" value="accept" selected>
                              {submission.statusExam}
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

export default SubmissionExamDash;
