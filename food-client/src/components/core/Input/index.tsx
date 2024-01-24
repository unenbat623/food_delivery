"use client";

import { Stack, TextField, Typography } from "@mui/material";
import React, { ChangeEvent } from "react";

interface IInputProps {
  label: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ label, placeholder, onChange }: IInputProps) => {
  return (
    <Stack>
      <Typography fontSize={15} mb={1} mt={1}>
        {label}
      </Typography>
      <TextField onChange={onChange} placeholder={placeholder}></TextField>
    </Stack>
  );
};
