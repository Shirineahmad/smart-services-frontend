import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,Button,TextField
} from "@mui/material";
import axios from "axios";

const UserData = () => {
  const [dataUser, setDataUser] = useState([]);
  const [resultSearch, setResultSearch] = React.useState([]);
  const [showSearch, setShowSearch] = React.useState(false);
   const [searchName, setSearchName] = React.useState("");
  const searchUser = (e) => {
     e.preventDefault();
     setShowSearch(true);

     const result = dataUser
       .filter((data) => {
         const userFirstName = (data.firstName || "").toLowerCase();
         const userLastName = (data.lastName || "").toLowerCase();

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
 
   

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://127.0.01:8000/user/getAll");
        console.log("response.data", response.data.data);
        if (response.data.success) {
          setDataUser(
            response.data.data.filter((data) => data.role === "client")
          );
        } else {
          console.error("Error fetching users:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };

    fetchUsers();
  }, []);

  console.log("users", dataUser);

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
      </form>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>User Name</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Apply Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {showSearch
                ? resultSearch.map((data) => (
                    <TableRow key={data._id}>
                      <TableCell>
                        {data.firstName} {data.LastName}
                      </TableCell>
                      <TableCell>{data.phoneNumber}</TableCell>
                      <TableCell>{data.email}</TableCell>
                      <TableCell>
                        {new Date(data.createdAt).toISOString().split("T")[0]}
                      </TableCell>
                    </TableRow>
                  ))
                : dataUser.map((data) => (
                    <TableRow key={data._id}>
                      <TableCell>
                        {data.firstName} {data.LastName}
                      </TableCell>
                      <TableCell>{data.phoneNumber}</TableCell>
                      <TableCell>{data.email}</TableCell>
                      <TableCell>
                        {new Date(data.createdAt).toISOString().split("T")[0]}
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

export default UserData;
