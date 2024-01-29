"use client";

import { Button, Input } from "@/components";
import { Box, Container, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { ChangeEvent } from "react";
import { object, string } from "yup";

interface IStepProps {
  email: string;
  handleNext: () => void;
  handleChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
}

const StepOne = ({ email, handleNext, handleChangeInput }: IStepProps) => {
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
          padding: "5rem 0",
        }}
      >
        <Typography
          align="center"
          gutterBottom
          sx={{ fontSize: "28px", fontWeight: "700" }}
        >
          Нууц үг сэргээх
        </Typography>
        <Input label="Имэйл" onChange={handleChangeInput} name="email" />
        <Stack flex="row" width="100%" justifyContent="flex-end">
          <Button label={"Үргэлжлүүлэх"} onClick={handleNext} />
        </Stack>
      </Box>
    </Container>
  );
};

export default StepOne;
