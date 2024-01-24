"use client";

import { Stack, Box, Button as MuiButton } from "@mui/material";
import React, { ReactNode } from "react";

interface IButtonProps {
  label: ReactNode;
  disable?: boolean;
  btnType?: "contained" | "outlined";
  onclick?: () => void;
}

export const Button = ({
  label,
  btnType,
  disable = false,
  onclick,
}: IButtonProps) => {
  return (
    <Stack gap={2}>
      <MuiButton
        onClick={onclick}
        color="primary"
        variant={btnType}
        sx={{
          p: 3,
          color: btnType === "outlined" ? "black" : "white",
          border: 1,
          borderColor: "#18BA51",
        }}
        disabled={disable}
        size="medium"
      >
        {label}
      </MuiButton>
    </Stack>
  );
};
