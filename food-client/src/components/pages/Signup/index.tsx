import { Button, Input } from "@/components";
import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import React, { useContext } from "react";
import { UserContext } from "@/context/UserProvider";
import { useFormik } from "formik";

const validationSchema = yup.object({
  name: yup
    .string()
    .max(100, "Нэр хаяг 100 тэмдэгтээч хэтрэхгүй байна.")
    .required("Нэрийг заавал бөглөнө үү."),
  email: yup
    .string()
    .max(100, "Имэйл хаяг 100 тэмдэгтээч хэтрэхгүй байна.")
    .required("Имэйл хаягыг заавал бөглөнө үү.")
    .email("Хүчинтэй имэйл хаяг байх ёстой")
    .matches(
      /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@gmail[A-Za-z0-9.-]+$/,
      "Та зөвхөн gmail хаяг оруулна"
    ),
  address: yup.string().required("Хаягаа заавал бөглөнө үү."),
  password: yup
    .string()
    .required("Нууц үгээ заавал бөглөнө үү.")
    .min(6, "Нууц үг хамгийн багадаа . тэмдэгт байх байх ёстой."),
  repassword: yup
    .string()
    .required("Нууц үгээ заавал бөглөнө үү.")
    .min(6, "Нууц үг хамгийн багадаа . тэмдэгт байх байх ёстой."),
});

const SignupPage = () => {
  const { login } = useContext(UserContext);

  const formik = useFormik({
    onSubmit: ({ email, password }) => {
      login(email, password);
    },
    initialValues: { name: "", email: "", address: "", password: "" },
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
          Бүртгүүлэх
        </Typography>
        <Stack width="100%" sx={{ mb: "1rem" }}>
          <Input
            name="name"
            label="Нэр"
            value={formik.values.name}
            onChange={formik.handleChange}
            errorText={formik.errors.name}
          />
          <Input
            name="email"
            label="И-Мэйл"
            value={formik.values.email}
            onChange={formik.handleChange}
            errorText={formik.errors.email}
          />
          <Input
            name="address"
            label="Хаяг"
            value={formik.values.address}
            onChange={formik.handleChange}
            errorText={formik.errors.address}
          />
          <Input
            name="password"
            label="Нууц үг"
            value={formik.values.password}
            onChange={formik.handleChange}
            errorText={formik.errors.password}
            showPassword
          />
          <Input
            name="re-password"
            label="Нууц үг давтах"
            value={formik.values.password}
            onChange={formik.handleChange}
            errorText={formik.errors.password}
            showPassword
          />
        </Stack>

        <Stack sx={{ mb: "1rem" }}>
          <FormControlLabel
            control={<Checkbox name="jason" />}
            label="Үйлчилгээний нөхцөл зөвшөөрөх"
          />
        </Stack>

        <Stack flex="row" width="100%" justifyContent="flex-end">
          <Button label="Бүртгүүлэх" onClick={formik.handleSubmit} />
        </Stack>
      </Box>
    </Container>
  );
};

export default SignupPage;
