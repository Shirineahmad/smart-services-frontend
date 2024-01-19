import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";

const UserData = () => {
  const [dataUser, setDataUser] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://127.0.01:8000/user/getAll");
        console.log("response.data", response.data.data);
        if (response.data.success) {
          setDataUser(response.data.data);
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
              {dataUser.map((data) => (
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
