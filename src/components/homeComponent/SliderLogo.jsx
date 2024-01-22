import React from 'react'
import logo1 from "../../images/362px-Logo_GoetheInstitut_2011_svg.png"
import logo2 from "../../images/OMT.jpg";
import logo3 from "../../images/ap01.jpg";
import logo4 from "../../images/ap03.jpg";
import logo5 from "../../images/mea-logo-new.png";
import logo6 from "../../images/british-council-logo-B41801DAAD-seeklogo.com.png";
import logo7 from "../../images/ap05.jpg";

import {Container,Box} from "@mui/material";
const SliderLogo = () => {

  return (
    <Container
      maxWidth={1200}
      sx={{
        mt: 4,
        mb: 4,
        ml: 0,
        mr: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          borderRadius: 12,
          overflow: "hidden",
          position: "relative",
          display: "flex",
          flexDirection: "row",
          gap: 16,
          marginTop: 40,
          marginBottom: 40,
          "::before, ::after": {
            background:
              "linear-gradient(to right, #FFF 0%, rgba(255, 255, 255, 0) 100%)",
            content: "",
            height: "100%",
            position: "absolute",
            width: 200,
            zIndex: 1,
            // transform: "rotateZ(180deg)",
            pointerEvents: "none",
          },
          "::before": {
            left: 0,
          },
          "::after": {
            right: 0,
          },
        }}
      >
        <div
          sx={{
            animation: "animation-usvj6h 120s linear infinite",
            display: "flex",
            gap: 16,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <img
            src="/static/branding/about/group-photo/teide-group.jpg"
            loading="lazy"
            sx={{
              width: 400,
              height: 300,
              boxSizing: "content-box",
              objectFit: "cover",
              borderRadius: 12,
              border: "1px solid",
              borderColor: "var(--muidocs-palette-divider)",
              boxShadow: "0px 2px 8px var(--muidocs-palette-grey-200)",
              transition: "all 100ms ease",
            }}
            alt="idk"
          />
          <img
            src={logo1}
            loading="lazy"
            sx={{
              width: 400,
              height: 300,
              boxSizing: "content-box",
              objectFit: "cover",
              borderRadius: 12,
              border: "1px solid",
              borderColor: "var(--muidocs-palette-divider)",
              boxShadow: "0px 2px 8px var(--muidocs-palette-grey-200)",
              transition: "all 100ms ease",
            }}
            alt="idk"
          />
          <img
            src={logo2}
            loading="lazy"
            sx={{
              width: 400,
              height: 300,
              boxSizing: "content-box",
              objectFit: "cover",
              borderRadius: 12,
              border: "1px solid",
              borderColor: "var(--muidocs-palette-divider)",
              boxShadow: "0px 2px 8px var(--muidocs-palette-grey-200)",
              transition: "all 100ms ease",
            }}
            alt="idk"
          />
          <img
            src={logo3}
            loading="lazy"
            sx={{
              width: 400,
              height: 300,
              boxSizing: "content-box",
              objectFit: "cover",
              borderRadius: 12,
              border: "1px solid",
              borderColor: "var(--muidocs-palette-divider)",
              boxShadow: "0px 2px 8px var(--muidocs-palette-grey-200)",
              transition: "all 100ms ease",
            }}
            alt="idk"
          />
          <img
            src={logo4}
            loading="lazy"
            sx={{
              width: 400,
              height: 300,
              boxSizing: "content-box",
              objectFit: "cover",
              borderRadius: 12,
              border: "1px solid",
              borderColor: "var(--muidocs-palette-divider)",
              boxShadow: "0px 2px 8px var(--muidocs-palette-grey-200)",
              transition: "all 100ms ease",
            }}
            alt="idk"
          />
          <img
            src={logo5}
            loading="lazy"
            sx={{
              width: 400,
              height: 300,
              boxSizing: "content-box",
              objectFit: "cover",
              borderRadius: 12,
              border: "1px solid",
              borderColor: "var(--muidocs-palette-divider)",
              boxShadow: "0px 2px 8px var(--muidocs-palette-grey-200)",
              transition: "all 100ms ease",
            }}
            alt="idk"
          />
          <img
            src="logo6"
            loading="lazy"
            sx={{
              width: 400,
              height: 300,
              boxSizing: "content-box",
              objectFit: "cover",
              borderRadius: 12,
              border: "1px solid",
              borderColor: "var(--muidocs-palette-divider)",
              boxShadow: "0px 2px 8px var(--muidocs-palette-grey-200)",
              transition: "all 100ms ease",
            }}
            alt="idk"
          />
          <img
            src={logo7}
            loading="lazy"
            sx={{
              width: 400,
              height: 300,
              boxSizing: "content-box",
              objectFit: "cover",
              borderRadius: 12,
              border: "1px solid",
              borderColor: "var(--muidocs-palette-divider)",
              boxShadow: "0px 2px 8px var(--muidocs-palette-grey-200)",
              transition: "all 100ms ease",
            }}
            alt="idk"
          />
        </div>
      </Box>
    </Container>
  );
}

export default SliderLogo