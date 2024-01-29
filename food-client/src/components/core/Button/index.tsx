"use client";

import { Button as MuiButton, Stack } from "@mui/material";

interface IButtonProps {
  label: string;
  disabled?: boolean;
  loading?: boolean;
  btnType?: "contained" | "outlined" | "text";
  onClick?: () => void;
  href?: string;
}

export const Button = ({
  label,
  disabled = false,
  loading = false,
  btnType = "contained",
  onClick,
  href,
}: IButtonProps) => {
  return (
    <Stack>
      <MuiButton
        href={href}
        onClick={onClick}
        color="primary"
        variant={btnType}
        sx={{
          p: 4,
          fontSize: "1rem",
          color:
            btnType === "outlined" || btnType === "text" ? "#18ba51" : "white",
          border: btnType === "outlined" ? 1 : 0,
          borderColor: btnType === "outlined" ? "#18ba51" : "",
        }}
        disabled={disabled}
        size="medium"
      >
        {label}
      </MuiButton>
    </Stack>
  );
};
