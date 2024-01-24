import React from "react";
import { Button, Input } from "@/components";
import { Box, Container, Stack, Typography } from "@mui/material";

const ResetEmailPassword = () => {
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
        <Typography>
          Таны <span style={{ color: "#18BA51" }}>example@pinecone.mn </span>
          хаяг руу сэргээх код илгээх болно.{" "}
        </Typography>
        <Stack width="100%" sx={{ mb: "2rem", marginTop: "20px" }}>
          <Input label="Нууц үг сэргээх код" placeholder="*********" />
        </Stack>

        <Stack flex="row" width="100%" justifyContent="flex-end">
          <Button label="Үргэлжлүүлэх" btnType="outlined" />
        </Stack>
      </Box>
    </Container>
  );
};

export default ResetEmailPassword;
