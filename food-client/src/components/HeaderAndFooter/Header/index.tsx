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
  InputBase,
  Badge,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import HistoryIcon from "@mui/icons-material/History";
import CloseIcon from "@mui/icons-material/Close";
import { Logo } from "@/components/Logos";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import MyDrawer from "./Drawer";
import { useBasket } from "@/context/BasketProvider";
import { useUser } from "@/context/UserProvider";
import { useFood } from "@/context/FoodProvider";

const pages = [
  { label: "НҮҮР", href: "/" },
  { label: "ХООЛНЫ ЦЭС", href: "/menu" },
  { label: "ХҮРГЭЛТИЙН БҮС", href: "/delivery" },
];

export const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { totalCount, isDrawerOpen, setIsDrawerOpen } = useBasket();
  const { user, isLoggedIn, logout } = useUser();
  const { searchQuery, setSearchQuery } = useFood();

  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pathname !== "/menu") {
      router.push("/menu");
    }
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        top: 0,
        zIndex: 1100,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 72 }, gap: 2 }}>
          {/* Mobile menu icon */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={() => setMobileNavOpen(true)}
              sx={{ color: "#1e293b", p: 1 }}
              aria-label="Navigation Menu"
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Logo */}
          <Box sx={{ flexShrink: 0, mr: { md: 3 } }}>
            <Logo />
          </Box>

          {/* Desktop Navigation Links */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 1,
            }}
          >
            {pages.map((page) => {
              const isActive = pathname === page.href;
              return (
                <Link
                  key={page.label}
                  href={page.href}
                  style={{
                    color: isActive ? "#18BA51" : "#334155",
                    textDecoration: "none",
                    fontSize: "0.925rem",
                    fontWeight: isActive ? 700 : 600,
                    padding: "8px 16px",
                    borderRadius: "8px",
                    backgroundColor: isActive ? "rgba(24, 186, 81, 0.08)" : "transparent",
                    transition: "all 0.2s ease",
                  }}
                >
                  {page.label}
                </Link>
              );
            })}
          </Box>

          {/* Search Bar */}
          <Box
            component="form"
            onSubmit={handleSearchSubmit}
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              bgcolor: "#f1f5f9",
              borderRadius: "10px",
              px: 1.5,
              py: 0.5,
              width: { sm: 200, md: 260 },
              transition: "width 0.3s ease, box-shadow 0.2s ease",
              "&:focus-within": {
                width: { sm: 240, md: 300 },
                boxShadow: "0 0 0 2px rgba(24, 186, 81, 0.3)",
                bgcolor: "#fff",
              },
            }}
          >
            <SearchOutlinedIcon sx={{ color: "#94a3b8", mr: 1, fontSize: 20 }} />
            <InputBase
              placeholder="Хоол, зууш хайх..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                fontSize: "0.875rem",
                color: "#1e293b",
                width: "100%",
                "& input": { p: 0.5 },
              }}
            />
          </Box>

          {/* Cart & Profile Actions */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: "auto" }}>
            {/* Basket Button */}
            <Button
              onClick={() => setIsDrawerOpen(true)}
              variant="text"
              sx={{
                color: "#1e293b",
                borderRadius: "10px",
                px: { xs: 1, sm: 1.5 },
                py: 1,
                display: "flex",
                alignItems: "center",
                gap: 1,
                "&:hover": { bgcolor: "rgba(24, 186, 81, 0.08)" },
              }}
            >
              <Badge
                badgeContent={totalCount}
                color="primary"
                sx={{
                  "& .MuiBadge-badge": {
                    bgcolor: "#18BA51",
                    color: "#fff",
                    fontWeight: 700,
                  },
                }}
              >
                <ShoppingBasketOutlinedIcon sx={{ fontSize: 22, color: "#18BA51" }} />
              </Badge>
              <Typography
                sx={{
                  display: { xs: "none", md: "inline" },
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  color: "#1e293b",
                }}
              >
                Сагс
              </Typography>
            </Button>

            {/* User Profile or Login Button */}
            {isLoggedIn && user ? (
              <Box>
                <Tooltip title="Хэрэглэгчийн тохиргоо">
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{
                      p: 0.5,
                      border: "2px solid #18BA51",
                      "&:hover": { transform: "scale(1.05)" },
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "#18BA51",
                        width: 34,
                        height: 34,
                        fontSize: "0.9rem",
                        fontWeight: 700,
                      }}
                    >
                      {user.name ? user.name[0].toUpperCase() : "U"}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  keepMounted
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  PaperProps={{
                    sx: {
                      borderRadius: "14px",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                      minWidth: 200,
                      p: 1,
                    },
                  }}
                >
                  <Box sx={{ px: 2, py: 1 }}>
                    <Typography fontWeight={700} fontSize="0.95rem">
                      {user.name}
                    </Typography>
                    <Typography fontSize="0.75rem" color="text.secondary">
                      {user.email}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      router.push("/order/orderHistory");
                    }}
                    sx={{ borderRadius: "8px", gap: 1.5, py: 1 }}
                  >
                    <HistoryIcon fontSize="small" sx={{ color: "#18BA51" }} />
                    <Typography fontSize="0.875rem" fontWeight={500}>
                      Захиалгын түүх
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      logout();
                    }}
                    sx={{
                      borderRadius: "8px",
                      gap: 1.5,
                      py: 1,
                      color: "#ef4444",
                    }}
                  >
                    <LogoutIcon fontSize="small" />
                    <Typography fontSize="0.875rem" fontWeight={500}>
                      Системээс гарах
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Link href="/login" style={{ textDecoration: "none" }}>
                <Button
                  variant="outlined"
                  sx={{
                    color: "#18BA51",
                    borderColor: "#18BA51",
                    borderRadius: "10px",
                    px: { xs: 1.5, sm: 2 },
                    py: 0.75,
                    display: "flex",
                    alignItems: "center",
                    gap: 0.75,
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    "&:hover": {
                      bgcolor: "rgba(24, 186, 81, 0.08)",
                      borderColor: "#15803d",
                    },
                  }}
                >
                  <PersonOutlineOutlinedIcon sx={{ fontSize: 20 }} />
                  <span style={{ display: "inline-block" }}>Нэвтрэх</span>
                </Button>
              </Link>
            )}
          </Box>
        </Toolbar>
      </Container>

      {/* Cart Drawer */}
      <MyDrawer
        open={isDrawerOpen}
        handleClose={() => setIsDrawerOpen(false)}
      />

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="left"
        open={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        PaperProps={{ sx: { width: 280, p: 2 } }}
      >
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
          <Logo size={32} />
          <IconButton onClick={() => setMobileNavOpen(false)} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2 }} />

        {/* Mobile Search */}
        <Box
          component="form"
          onSubmit={(e) => {
            handleSearchSubmit(e);
            setMobileNavOpen(false);
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: "#f1f5f9",
            borderRadius: "10px",
            px: 1.5,
            py: 0.75,
            mb: 2,
          }}
        >
          <SearchOutlinedIcon sx={{ color: "#94a3b8", mr: 1, fontSize: 18 }} />
          <InputBase
            placeholder="Хоол хайх..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ fontSize: "0.85rem", width: "100%" }}
          />
        </Box>

        <List sx={{ p: 0 }}>
          {pages.map((page) => (
            <ListItem key={page.label} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                component={Link}
                href={page.href}
                onClick={() => setMobileNavOpen(false)}
                sx={{
                  borderRadius: "10px",
                  bgcolor: pathname === page.href ? "rgba(24, 186, 81, 0.1)" : "transparent",
                  color: pathname === page.href ? "#18BA51" : "#1e293b",
                }}
              >
                <ListItemText
                  primary={page.label}
                  primaryTypographyProps={{ fontWeight: pathname === page.href ? 700 : 600 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
};
