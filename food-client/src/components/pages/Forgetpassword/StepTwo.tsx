"use client";

import { Button, Input } from "@/components";
import { Box, Container, Stack, Typography } from "@mui/material";
import instanceAxios from "@/utils/axios";
import React, { ChangeEvent } from "react";
import { toast } from "react-toastify";

interface IStepProps {
  email: string;
  otp: string;
  handleNext: () => void;
  handleChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
}

const StepTwo = ({ email, otp, handleNext, handleChangeInput }: IStepProps) => {
  const handleSendOtp = async () => {
    try {
      const data = await instanceAxios.post("/verify/otp", {
        email,
        otp,
      });
      handleNext();
    } catch (error) {
      console.log(error);
      toast.error("OTP илгэээхэд алдаа гарлаа.");
    }
  };

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
        <Typography>
          Таны <span style={{ color: "#18BA51" }}>{email}</span> хаяг руу
          сэргээх код илгээх болно.
        </Typography>
        <Stack width="100%" sx={{ mb: "2rem" }}>
          <Input
            name="otp"
            label="Нууц үг сэргээх код"
            onChange={handleChangeInput}
          />
          <Button label={"Үргэлжлүүлэх"} onClick={handleSendOtp} />
        </Stack>
      </Box>
    </Container>
  );
};

export default StepTwo;
