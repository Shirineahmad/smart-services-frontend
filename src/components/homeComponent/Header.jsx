import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";


const pages = ["Services", "About Us", "Contact Us", "Apply"];
const settings = ["Profile", "Dashboard", "Logout"];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#DDF7E3", opcaity: "1" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 0,
              display: "flex",
              flexDirection: "column", // Set flex direction to column

              alignItems: { xs: "center", md: "flex-start" }, // Center on smaller screens
            }}
          >
            {" "}
            <Box
              sx={{
                mt: 1,
                flexGrow: 1,
                display: "flex",
                flexDirection: "row", // Set flex direction to column
                alignItems: { xs: "center", md: "flex-start" }, // Center on smaller screens
              }}
            >
              <Typography
                variant="h4"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 0.5,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "popins",
                  fontWeight: 700,
                  letterSpacing: ".0.7rem",
                  color: "#DF2E38",
                  textDecoration: "none",
                }}
              >
                Shiro
              </Typography>
              <Typography
                variant="h4"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 1,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "popins",
                  fontWeight: 700,
                  letterSpacing: ".0.7rem",
                  color: "#5D9C59",
                  textDecoration: "none",
                }}
              >
                Group
              </Typography>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                m: 0,
                display: { xs: "none", md: "flex", justifyItems: "center" },
                fontFamily: "popins",
                fontWeight: 400,
                letterSpacing: ".0.7rem",
                color: "#DF2E38",
                textDecoration: "none",
              }}
            >
              Travel Mangement System
            </Typography>
          </Box>

          <Box
            sx={{
              flexGrow: 0,
              justifyContent: "center",
              display: {
                xs: "flex",
                md: "none",
                justifyContent: "center",
              },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: {
                  xs: "block",
                  md: "none",
                },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              flexGrow: 0,
              display: "",
              flexDirection: "column",
              alignItems: { xs: "center", md: "flex-start" }
            }}flex
          >
            <Box
              sx={{
                mt: 1,
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                flexDirection: "row", // Set flex direction to column
                alignItems: { xs: "center", md: "flex-start" }, // Center on smaller screens
              }}
            >
              <Typography
                variant="h4"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 0.5,
                  display: { xs: "flex", md: "none" },
                  fontFamily: "popins",
                  fontWeight: 700,
                  letterSpacing: ".0.7rem",
                  color: "#DF2E38",
                  textDecoration: "none",
                }}
              >
                Shiro
              </Typography>
              <Typography
                variant="h4"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 1,
                  display: { xs: "flex", md: "none" },
                  fontFamily: "popins",
                  fontWeight: 700,
                  letterSpacing: ".0.7rem",
                  color: "#5D9C59",
                  textDecoration: "none",
                }}
              >
                Group
              </Typography>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                m: 0,
                display: {xs: 'flex', md: 'none', justifyItems: "center" },
                fontFamily: "popins",
                fontWeight: 400,
                letterSpacing: ".0.7rem",
                color: "#DF2E38",
                textDecoration: "none",
              }}
            >
              Travel Mangement System
            </Typography>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: "none",
                md: "flex",
                justifyContent: "center",
                columnGap: "150px",
              },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "#DF2E38", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  sx={{ backgroundColor: "#DF2E38" }}
                  src="/broken-image.jpg"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;