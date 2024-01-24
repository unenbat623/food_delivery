"use client";

import { Button, Input } from "@/components";
import { Box, Container, Icon, Stack, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";

const SignUp = () => {
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
          Бүртгүүлэх
        </Typography>
        <Stack width="100%" sx={{ mb: "1rem", fontSize: "10px" }}>
          <Input label="Нэр" placeholder="Нэрээ оруулна уу" />
          <Input label="И-мэйл" placeholder="И-мэйл хаягаа оруулна уу" />
          <Input label="Хаяг" placeholder="Та хаягаа оруулна уу" />
          <Input label="Нууц үг" placeholder="Нууц үгээ оруулна уу" />
          <Input label="Нууц үг давтах" placeholder="Нууц үгээ оруулна уу" />
        </Stack>
        <Box display={"flex"} marginRight={24} marginBottom={3}>
          <Image alt="" src="cloud.svg" width={30} height={20} />
          <Stack>Үйлчилгээний нөхцөо зөвшөөрөх</Stack>
        </Box>
        <Stack flex="row" width="100%" justifyContent="flex-end">
          <Button label="Бүртгүүлэх" btnType="outlined" />
        </Stack>
      </Box>
    </Container>
  );
};

export default SignUp;
