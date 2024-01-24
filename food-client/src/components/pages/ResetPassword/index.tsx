import React from "react";
import { Button, Input } from "@/components";
import { Box, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";

const ResetPassword = () => {
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
          Нууц үг сэргээх
        </Typography>
        <Stack width="100%" sx={{ mb: "2rem", marginTop: "20px" }}>
          <Input label="Имэйл" placeholder="Имэйл хаягаа оруулна уу" />
        </Stack>

        <Stack flex="row" width="100%" justifyContent="flex-end">
          <Link href="/ResetEmailPassword">
            <Button label="Үргэлжлүүлэх" btnType="outlined" />
          </Link>
        </Stack>
      </Box>
    </Container>
  );
};

export default ResetPassword;
