"use client";

import { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Popover from "@mui/material/Popover";
import { alpha } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/providers";

export default function AccountPopover() {
  const [open, setOpen] = useState<HTMLElement | null>(null);
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();

  const handleOpen = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleNavigate = (path: string) => {
    setOpen(null);
    router.push(path);
  };

  const handleLogout = () => {
    setOpen(null);
    logout();
  };

  const displayName = user?.name || "Админ";
  const displayEmail = user?.email || "batbaatarunenbat20@gmail.com";
  const photoURL = user?.avatarUrl || "/assets/images/avatars/avatar_25.jpg";

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(Boolean(open)
            ? {
                background: (theme: any) =>
                  `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
              }
            : {}),
        }}
      >
        <Avatar
          src={photoURL}
          alt={displayName}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {displayName.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 220,
            borderRadius: 2,
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap fontWeight={700}>
            {displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {displayEmail}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem onClick={() => handleNavigate("/dashboard")}>
          Дашбоард
        </MenuItem>
        <MenuItem onClick={() => handleNavigate("/order")}>
          Захиалгууд
        </MenuItem>
        <MenuItem onClick={() => handleNavigate("/food")}>
          Хоолны цэс
        </MenuItem>
        <MenuItem onClick={() => handleNavigate("/user")}>
          Хэрэглэгчид
        </MenuItem>

        <Divider sx={{ borderStyle: "dashed", m: 0 }} />

        <MenuItem
          onClick={handleLogout}
          sx={{ typography: "body2", color: "error.main", py: 1.5, fontWeight: 600 }}
        >
          Гарах (Logout)
        </MenuItem>
      </Popover>
    </>
  );
}
