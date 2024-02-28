"use client";

import { ChangeEvent, useState } from "react";
import Box from "@mui/material/Box";
import Link from "next/link";
import { Link as MuiLink } from "@mui/material";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";
import { alpha, useTheme } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";

import { bgGradient } from "@/theme/css";

import Logo from "@/components/logo";
import Iconify from "@/components/iconify";
import axios from "axios";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();
  const router = useRouter();

  const [userEmail, setUserEmail] = useState("ugtakhbayars@gmail.com");
  const [userPassword, setUserPassword] = useState("admin12345");
  const [userRePassword, setUserRePassword] = useState("admin12345");

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const resetPassword = async () => {
    try {
      setIsLoading(true);
      const {
        data: { message },
      } = (await axios.post("http://localhost:8080/verify/reset-password", {
        userEmail,
        userPassword,
      })) as {
        data: { message: string };
      };
      toast.success(message, {
        onClose: () => {
          router.push("/login");
        },
      });
    } catch (error: any) {
      toast.error("Aлдаа: " + error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email address"
          value={userEmail}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setUserEmail(e.target.value);
          }}
        />

        <TextField
          name="password"
          label="Password"
          value={userPassword}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setUserPassword(e.target.value);
          }}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          name="rePassword"
          label="Re Password"
          value={userRePassword}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setUserRePassword(e.target.value);
          }}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ my: 3 }}
      >
        <Link href={"/login"} passHref style={{ textDecoration: "none" }}>
          <MuiLink variant="subtitle2" underline="hover">
            LOGIN
          </MuiLink>
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={resetPassword}
        loading={isLoading}
      >
        RECOVER
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: "/assets/background/overlay_4.jpg",
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: "fixed",
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography sx={{ mt: 2, mb: 5 }} variant="h4">
            Recover Password
          </Typography>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
