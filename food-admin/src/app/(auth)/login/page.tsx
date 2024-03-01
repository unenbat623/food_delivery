"use client";

import { ChangeEvent, useContext, useState } from "react";
import Box from "@mui/material/Box";
import Link from "next/link";
import { Link as MuiLink } from "@mui/material";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";
import { alpha, useTheme } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import { redirect } from "next/navigation";
import { bgGradient } from "@/theme/css";
import Logo from "@/components/logo";
import Iconify from "@/components/iconify";
import axios, { AxiosError } from "axios";
import { UserType, AuthContext } from "@/providers";
import { toast } from "react-toastify";

export default function LoginView() {
  const theme = useTheme();
  const { setAuthUserAndToken } = useContext(AuthContext);

  const [userEmail, setUserEmail] = useState("@gmail.com");
  const [userPassword, setUserPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const login = async () => {
    try {
      const {
        data: { user, token },
      } = (await axios.post("http://localhost:8080/auth/login", {
        userEmail,
        userPassword,
      })) as {
        data: { token: string; user: UserType };
      };

      console.log(token, user);
      setAuthUserAndToken(user, token);
    } catch (error: any) {
      toast.error("Aлдаа: " + error.response.data.message);
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
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ my: 3 }}
      >
        <Link
          href={"/forget-password"}
          passHref
          style={{ textDecoration: "none" }}
        >
          <MuiLink variant="subtitle2" underline="hover">
            Нууц үг сэргээх?
          </MuiLink>
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={login}
      >
        НЭВТРЭХ
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
            Sigin in to Food Platform
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:google-fill" color="#DF3E30" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:facebook-fill" color="#1877F2" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              OR
            </Typography>
          </Divider>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
