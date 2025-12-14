"use client";

import { useState, MouseEvent } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Tooltip,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Logo } from "@/components/Logos";

import Link from "next/link";
import MyDrawer from "./Drawer";

const pages = [
  { label: "НҮҮР", href: "/" },
  { label: "ХООЛНЫ ЦЭС", href: "/menu" },
  { label: "ХҮРГЭЛТИЙН БҮС", href: "/delivery" },
];

const settings = ["Профайл", "Тохиргоо", "Гарах"];

export const Header = () => {
  const [drawer, setDrawer] = useState(false);
  const user = null;
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenDrawer = () => setDrawer(true);
  const handleCloseDrawer = () => setDrawer(false);
  return (
    <AppBar
      position="static"
      sx={{
        background: "white",
        boxShadow: "none",
        borderBottom: "1px lightgrey solid",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo />

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              sx={{ color: "black" }}
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
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                  <Link href={page.href} style={{ textDecoration: "none", color: "black", width: "100%" }}>
                    <Typography textAlign="center">{page.label}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, alignItems: "center" }}>
            {pages.map((page) => (
              <Link
                key={page.label}
                href={page.href}
                style={{
                  color: "black",
                  textDecoration: "none",
                  margin: "auto 8px",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  padding: "6px 12px",
                  borderRadius: "8px",
                  transition: "all 0.2s",
                }}
              >
                {page.label}
              </Link>
            ))}
          </Box>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              position: "relative",
            }}
          >
            <SearchOutlinedIcon
              fontSize="medium"
              sx={{ position: "absolute", left: 12 }}
            />
            <OutlinedInput
              placeholder="Search"
              sx={{ borderRadius: 3, pl: 6, height: "42px" }}
            />
          </Box>

          <Box
            sx={{ display: "flex", alignItems: "center", gap: 2, flexGrow: 0 }}
          >
            <Box sx={{ px: 2 }}>
              <IconButton onClick={handleOpenDrawer} sx={{ color: "black" }}>
                <ShoppingBasketOutlinedIcon fontSize="medium" />
                <span
                  style={{
                    display: "inline-block",
                    marginLeft: "8px",
                    fontSize: "1rem",
                    fontWeight: "bold",
                  }}
                >
                  Сагс
                </span>
              </IconButton>
              <MyDrawer open={drawer} handleClose={handleCloseDrawer} />
            </Box>
            <Box sx={{ px: 2 }}>
              <Link href="/login" style={{ textDecoration: "none" }}>
                <IconButton sx={{ color: "black" }}>
                  <PersonOutlineOutlinedIcon fontSize="medium" />
                  <span
                    style={{
                      display: "inline-block",
                      marginLeft: "8px",
                      fontSize: "1rem",
                      fontWeight: "bold",
                    }}
                  >
                    Нэвтрэх
                  </span>
                </IconButton>
              </Link>
            </Box>

            {user && (
              <Tooltip title="Профайл">
                <IconButton onClick={handleOpenUserMenu}>
                  <Avatar alt="User" src="" />
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar >
      </Container >
    </AppBar >
  );
};
