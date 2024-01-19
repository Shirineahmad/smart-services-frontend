import React from 'react'
import Container from "@mui/material/Container";
import { Grid,  Paper, Typography,  } from "@mui/material";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";


   const VisaType = () => {
  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, ml: 0 }}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#DF2E38", // Set to red color
          }}
        >
          <Typography>Recent Orders</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 140,
                  backgroundColor: "yellow",
                }}
              >
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 100,
                    padding: 0,
                    backgroundColor: "yellow",
                  }}
                >
                  hello
                </Paper>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Ship To</TableCell>
                      <TableCell>Payment Method</TableCell>
                      <TableCell align="right">Sale Amount</TableCell>
                    </TableRow>
                 
                      <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>1</TableCell>
                        <TableCell>1</TableCell>
                        <TableCell>1</TableCell>
                        <TableCell align="right"></TableCell>
                      </TableRow>
                   
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
}

export default VisaType