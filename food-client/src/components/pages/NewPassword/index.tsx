import React from "react";
import { Button, Input } from "@/components";
import { Box, Container, Stack, Typography } from "@mui/material";

const NewPassword = () => {
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
          Шинэ нууц үг зохиох
        </Typography>
        <Stack width="100%" sx={{ mb: "2rem", marginTop: "10px" }}>
          <Input label="Нууц үг " placeholder="*********" />
        </Stack>
        <Stack width="100%" sx={{ mb: "2rem", marginTop: "10px" }}>
          <Input label="Нууц үг сэргээх код" placeholder="*********" />
        </Stack>

        <Stack flex="row" width="100%" justifyContent="flex-end">
          <Button label="Үргэлжлүүлэх" btnType="outlined" />
        </Stack>
      </Box>
    </Container>
  );
};

export default NewPassword;
