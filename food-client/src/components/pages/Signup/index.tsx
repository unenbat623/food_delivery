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
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { useUser } from "@/context/UserProvider";
import Link from "next/link";
import { Logo } from "@/components/Logos";

export const SignupPage = () => {
  const { signup, isLoading } = useUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    await signup(name, email, address, phone, password, repassword);
  };

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 6, md: 8 } }}>
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
          Бүртгүүлэх
        </Typography>
        <Typography variant="body2" color="#64748b" sx={{ mb: 4 }}>
          Шинээр бүртгүүлж, амтат хоолоо шуурхай хүргүүлэн аваарай.
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Таны нэр"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              size="small"
              placeholder="Бат-Эрдэнэ"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon sx={{ color: "#94a3b8" }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Имэйл хаяг"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              size="small"
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
              label="Утасны дугаар"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              size="small"
              placeholder="99112233"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon sx={{ color: "#94a3b8" }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Хүргэлтийн хаяг"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              size="small"
              placeholder="Сүхбаатар дүүрэг, 1-р хороо..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <HomeOutlinedIcon sx={{ color: "#94a3b8" }} />
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
              size="small"
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

            <TextField
              fullWidth
              label="Нууц үг давтах"
              type={showPassword ? "text" : "password"}
              value={repassword}
              onChange={(e) => setRepassword(e.target.value)}
              required
              size="small"
              placeholder="••••••••"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon sx={{ color: "#94a3b8" }} />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isLoading}
              sx={{
                bgcolor: "#18BA51",
                py: 1.5,
                mt: 1,
                borderRadius: "12px",
                fontSize: "1rem",
                fontWeight: 700,
                boxShadow: "0 8px 20px rgba(24, 186, 81, 0.3)",
                "&:hover": { bgcolor: "#15803d" },
              }}
            >
              {isLoading ? "Бүртгэж байна..." : "Бүртгүүлэх"}
            </Button>
          </Stack>
        </form>

        <Box sx={{ mt: 4, pt: 3, borderTop: "1px solid #f1f5f9" }}>
          <Typography variant="body2" color="#64748b">
            Та аль хэдийн бүртгэлтэй юу?{" "}
            <Link href="/login" style={{ color: "#18BA51", fontWeight: 700, textDecoration: "none" }}>
              Нэвтрэх
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignupPage;
