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
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const pages = ["Services", "About Us"];
const settings = ["Profile", "Logout"];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userRole, setUserRole] = React.useState("");
  const [name, setName] = React.useState("");
  const navigate = useNavigate();
  React.useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setIsLoggedIn(true);
    }
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `http://127.0.01:8000/user/getById/${userId}`
        );
        console.log("firstName.data", response.data);
        if (response.data.success) {
          setName(response.data.data);
          console.log("response.data.data", response.data.data);
        } else {
          console.error("Error fetching products:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };
    fetchServices();
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    console.log("Closing navigation menu");
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  React.useEffect(() => {
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");
    if (userId) {
      setIsLoggedIn(true);
      setUserRole(role);
    }
  }, []);

  const handleLogout = () => {
    // Perform logout actions, e.g., clear local storage, close the menu, and navigate to the SignIn page
    localStorage.clear();
    handleCloseUserMenu();
    setIsLoggedIn(false);
    // Assuming you have a 'navigate' function from a routing library (like react-router-dom)
    // import { navigate } from 'react-router-dom';
    navigate("/");
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
            <Link to="/" style={{ textDecoration: "none" }}>
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
                  Smart
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
                  Services
                </Typography>
              </Box>{" "}
            </Link>
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
              {" "}
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "#DF2E38", display: "block" }}
                >
                  {page}
                </Button>
              ))}
                <Link to="/ContactUs" style={{ textDecoration: "none" }}>
                <Button sx={{ my: 2, color: "#DF2E38", display: "block" }}>
                  Contact Us
                </Button>
              </Link>
              <Link to="/ContactUs" style={{ textDecoration: "none" }}>
                <Button sx={{ my: 2, color: "#DF2E38", display: "block" }}>
                  Contact Us
                </Button>
              </Link>
              <Link to="/Apply" style={{ textDecoration: "none" }}>
                <Button sx={{ my: 2, color: "#DF2E38", display: "block" }}>
                  Apply
                </Button>
              </Link>
            </Menu>
          </Box>
          <Box
            sx={{
              flexGrow: 0,
              display: "",
              flexDirection: "column",
              alignItems: { xs: "center", md: "flex-start" },
            }}
            flex
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
                display: { xs: "flex", md: "none", justifyItems: "center" },
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
            <Link to="/ContactUs" style={{ textDecoration: "none" }}>
              <Button sx={{ my: 2, color: "#DF2E38", display: "block" }}>
                Contact Us
              </Button>
            </Link>
            <Link to="/Apply" style={{ textDecoration: "none" }}>
              <Button sx={{ my: 2, color: "#DF2E38", display: "block" }}>
                Apply
              </Button>
            </Link>
          </Box>
          {!isLoggedIn ? (
            <Link to="/SignIn">
              <IconButton sx={{ p: 0 }}>
                <Avatar
                  sx={{ backgroundColor: "#DF2E38" }}
                  src="/broken-image.jpg"
                />
              </IconButton>
            </Link>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              {userRole === "client" && ( // Check if the user role is "client"
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      sx={{ backgroundColor: "#DF2E38" }}
                      alt={name.firstName}
                      src="#"
                    />
                  </IconButton>
                </Tooltip>
              )}
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
                {settings.map(
                  (setting) => (
                    // (setting === "Dashboard" && userRole === "admin") ||
                    // setting !== "Dashboard" ? (
                    <MenuItem
                      key={setting}
                      onClick={
                        setting === "Logout"
                          ? handleLogout
                          : handleCloseUserMenu
                      }
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  )
                  // ) : null
                )}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
