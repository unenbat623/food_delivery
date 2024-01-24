"use client";

import { Button, Input } from "@/components";

import { Box, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";

import React from "react";

const LoginPage = () => {
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          margin: "auto ",
          px: "2.1rem",
          maxWidth: "450px",
          height: "calc(100vh - 90px)",
        }}
      >
        <Typography
          align="center"
          gutterBottom
          sx={{ fontSize: "28px", fontWeight: "700" }}
        >
          Нэвтрэх
        </Typography>
        <Stack width="100%" sx={{ mb: "2rem" }}>
          <Input label="Имэйл" placeholder="Нэрээ оруулна уу"></Input>
          <Input label="Нууц үг" placeholder="Нууц үгээ оруулна уу" />
          <Link href="/resetpassword">
            <Typography variant="button" marginLeft={60}>
              Нууц үг сэргээх
            </Typography>
          </Link>
        </Stack>

        <Stack flex="row" width="100%" justifyContent="flex-end">
          <Button label="Нэвтрэх" btnType="outlined" />
        </Stack>
        <Stack sx={{ my: "2rem" }}>
          <Typography>Эсвэл</Typography>
        </Stack>
        <Stack flex="row" width="100%" justifyContent="flex-end">
          <Link href="/signup">
            <Button label="Бүртгүүлэх" btnType="outlined" />
          </Link>
        </Stack>
      </Box>
    </Container>
  );
};

export default LoginPage;
