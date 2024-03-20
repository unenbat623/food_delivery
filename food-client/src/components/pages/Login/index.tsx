"use client";

import { Button, Input } from "@/components";
import { UserContext } from "@/context/UserProvider";
import { Box, Container, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import React, { useContext } from "react";

const validationSchema = yup.object({
  email: yup
    .string()
    .max(100, "Имэйл хаяг 100 тэмдэгтээч хэтрэхгүй байна.")
    .required("Имэйл хаягыг заавал бөглөнө үү.")
    .email("Хүчинтэй имэйл хаяг байх ёстой")
    .matches(
      /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@gmail[A-Za-z0-9.-]+$/,
      "Та зөвхөн gmail хаяг оруулна"
    ),
  password: yup
    .string()
    .required("Нууц үгээ заавал бөглөнө үү.")
    .min(6, "Нууц үг хамгийн багадаа . тэмдэгт байх байх ёстой."),
});
const LoginPage = () => {
  const { login } = useContext(UserContext);

  const formik = useFormik({
    onSubmit: ({ email, password }) => {
      console.log("EMAIL", email);
      console.log("PASS", password);
      login(email, password);
    },
    initialValues: { email: "", password: "" },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema,
  });

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
          Нэвтрэх
        </Typography>
        <Stack width="100%" sx={{ mb: "2rem" }}>
          <Input
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            errorText={formik.errors.email}
            label="Имэйл"
          />
          <Input
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            errorText={formik.errors.password}
            label="Нууц үг"
            showPassword
          />
          <Button label="Нууц үг сэргээх" btnType="text" href="/forgot-pass" />
        </Stack>

        <Stack flex="row" width="100%" justifyContent="flex-end">
          <Button label="Нэвтрэх" onClick={formik.handleSubmit} />
        </Stack>
        <Stack sx={{ my: "2rem" }}>
          <Typography>Эсвэл</Typography>
        </Stack>
        <Stack flex="row" width="100%" justifyContent="flex-end">
          <Button label="Бүртгүүлэх" btnType="outlined" href="/signup" />
        </Stack>
      </Box>
    </Container>
  );
};

export default LoginPage;
