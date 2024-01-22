import React from 'react'
import {
  Grid,
  Paper,
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";

import ApplyVisa from './ApplyVisa';


   const VisaType = ({visaData}) => {
    console.log("iam in visatype",visaData)
  return (
    
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, ml: 0,mr:0, display:"flex" }}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            width: "78%",
            flexDirection: "column",
            backgroundColor: "#ffff", // Set to red color
          }}
        >
          <Typography variant="h5">Visa Types</Typography>
          {visaData &&
            visaData.length > 0 &&
            visaData.map((visa) => (
              <Grid container spacing={3}>
                <Grid item xs={12} md={8} lg={9}>
                  <Paper
                    sx={{
                      display: "flex",
                      flexDirection: "column",

                      backgroundColor: "white",
                      width: "900px",
                      height: "100%",
                    }}
                  >
                    <Paper
                      sx={{
                        paddingLeft: "5px",
                        justifyContent: "center",
                        display: "flex",
                        flexDirection: "column",
                        height: 75,
                        backgroundColor: "#DF2E38",
                        color: "white",
                        fontSize: "20px",
                      }}
                    >
                      {visa.title}
                    </Paper>
                    <Table size="small" sx={{ backgroundColor: "#DDF7E3" }}>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            Processing Time <br />
                            {visa.requirmentValidation.processTime} days
                          </TableCell>
                          <TableCell>
                            To be applied before departure
                            <br />
                            {visa.requirmentValidation.toBeAppliedBefore} days
                          </TableCell>
                          <TableCell>
                            Validity
                            <br />
                            {visa.requirmentValidation.validity}
                          </TableCell>

                          <TableCell align="right">
                            Photo Specification
                            <br />
                            {visa.requirmentValidation.photoSize}
                          </TableCell>
                          <TableCell>
                            Visa Type
                            <br />
                            {visa.requirmentValidation.visaType}
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell>
                            Entry
                            <br />
                            {visa.requirmentValidation.visaType}
                          </TableCell>
                          <TableCell>
                            General Fees
                            <br />
                            {visa.fees.generalFees}
                          </TableCell>
                          <TableCell>
                            Fees (Adult)
                            <br />
                            {visa.fees.adultFees}
                          </TableCell>
                          <TableCell>
                            Fees (Child)
                            <br />
                            {visa.fees.childFees}
                          </TableCell>
                          <TableCell align="right">
                            Fees (Infant)
                            <br />
                            {visa.fees.infantFees}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>

                    <ol>
                      <Typography variant="h6" sx={{ color: "#DF2E38" }}>
                        Documents
                      </Typography>
                      {visa.documentsTitle &&
                        visa.documentsTitle.length > 0 &&
                        visa.documentsTitle.map((document, index) => (
                          <li key={index}> {document}</li>
                        ))}
                    </ol>
                  </Paper>
                </Grid>
              </Grid>
            ))}
        </Paper>
        <ApplyVisa visaData={visaData} />
      </Container>
   
  );
}

export default VisaType