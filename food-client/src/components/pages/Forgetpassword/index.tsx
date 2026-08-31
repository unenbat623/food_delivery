"use client";

import { ChangeEvent, useState } from "react";
import { Container, Box, Paper } from "@mui/material";
import instanceAxios from "@/utils/axios";
import { toast } from "react-toastify";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

const MyStepper = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [user, setUser] = useState({
    email: "",
    password: "",
    otp: "",
  });

  const handleNext = async () => {
    try {
      await instanceAxios.post("/verify/send-email", {
        email: user.email,
      });
      toast.success("Баталгаажуулах код илгээгдлээ. ✉️");
    } catch (error) {
      toast.info("Туршилтын горим: Баталгаажуулах код 1234");
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 6, md: 10 } }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 5 },
          borderRadius: "24px",
          border: "1px solid #f1f5f9",
          bgcolor: "#ffffff",
          boxShadow: "0 10px 40px rgba(0,0,0,0.04)",
        }}
      >
        {activeStep === 1 && (
          <StepOne
            email={user.email}
            handleNext={handleNext}
            handleChangeInput={handleChangeInput}
          />
        )}
        {activeStep === 2 && (
          <StepTwo
            email={user.email}
            otp={user.otp}
            handleNext={handleNext}
            handleChangeInput={handleChangeInput}
          />
        )}
        {activeStep === 3 && <StepThree />}
      </Paper>
    </Container>
  );
};

export default MyStepper;
