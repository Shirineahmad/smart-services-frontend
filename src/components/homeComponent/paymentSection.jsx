
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const paymentSection = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        columnGap: 5,
        height: 100,
        backgroundColor: "#DDF7E3",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontFamily: "popins",
          color: "#5D9C59",
          fontWeight: "larger",
        }}
      >
        Pay Service Amount Through Online
      </Typography>
      <Button
        variant="contained"
        sx={{
          fontFamily: "popins",
          backgroundColor: "#DF2E38",
          "&:hover": {
            backgroundColor: "#5D9C59", // Change to the desired hover color
          },
        }}
      >
        Direct Pay
      </Button>
    </Box>
  );
}

export default paymentSection