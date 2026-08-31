"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
  TextField,
  Button,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useUser } from "@/context/UserProvider";
import Link from "next/link";
import { Logo } from "@/components/Logos";

export const LoginPage = () => {
  const { login, isLoading } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    await login(email, password);
  };

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 6, md: 10 } }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 5 },
          borderRadius: "24px",
          border: "1px solid #f1f5f9",
          bgcolor: "#ffffff",
          boxShadow: "0 10px 40px rgba(0,0,0,0.04)",
          textAlign: "center",
        }}
      >
        <Box sx={{ mb: 3 }}>
          <Logo size={42} />
        </Box>

        <Typography variant="h4" fontWeight={900} color="#1e293b" gutterBottom>
          Нэвтрэх
        </Typography>
        <Typography variant="body2" color="#64748b" sx={{ mb: 4 }}>
          Та өөрийн бүртгэлтэй имэйл болон нууц үгээ оруулан нэвтэрнэ үү.
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2.5}>
            <TextField
              fullWidth
              label="Имэйл хаяг"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="example@gmail.com"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon sx={{ color: "#94a3b8" }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Нууц үг"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon sx={{ color: "#94a3b8" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Link href="/forget-pass" style={{ color: "#18BA51", fontSize: "0.875rem", fontWeight: 600 }}>
                Нууц үгээ мартсан уу?
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isLoading}
              sx={{
                bgcolor: "#18BA51",
                py: 1.5,
                borderRadius: "12px",
                fontSize: "1rem",
                fontWeight: 700,
                boxShadow: "0 8px 20px rgba(24, 186, 81, 0.3)",
                "&:hover": { bgcolor: "#15803d" },
              }}
            >
              {isLoading ? "Нэвтэрч байна..." : "Нэвтрэх"}
            </Button>
          </Stack>
        </form>

        <Box sx={{ mt: 4, pt: 3, borderTop: "1px solid #f1f5f9" }}>
          <Typography variant="body2" color="#64748b">
            Танд бүртгэл байхгүй юу?{" "}
            <Link href="/signup" style={{ color: "#18BA51", fontWeight: 700, textDecoration: "none" }}>
              Бүртгүүлэх
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
