"use client";

import React from "react";
import { Stack, Typography, Box } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

export const Completed = () => {
  return (
    <Stack direction="row" alignItems="center" spacing={2} sx={{ p: 2 }}>
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          bgcolor: "#18BA51",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CheckIcon fontSize="small" />
      </Box>
      <Stack spacing={0.5}>
        <Typography color="#8B8E95" fontSize={13} fontWeight={500}>
          Алхам 1
        </Typography>
        <Typography fontSize={17} fontWeight={700} color="#1e293b">
          Хаягийн мэдээлэл оруулах
        </Typography>
        <Typography color="#18BA51" fontSize={14} fontWeight={600}>
          Бүрэн бөглөсөн
        </Typography>
      </Stack>
    </Stack>
  );
};
export default Completed;
