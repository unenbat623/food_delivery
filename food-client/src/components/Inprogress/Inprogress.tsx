"use client";

import React from "react";
import { Stack, Typography, Box } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export const InProgress = () => {
  return (
    <Stack direction="row" alignItems="center" spacing={2} sx={{ p: 1 }}>
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          bgcolor: "rgba(24, 186, 81, 0.12)",
          color: "#18BA51",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LocationOnIcon fontSize="small" />
      </Box>
      <Stack spacing={0.25}>
        <Typography color="#8B8E95" fontSize={13} fontWeight={500}>
          Алхам 1
        </Typography>
        <Typography fontSize={17} fontWeight={700} color="#1e293b">
          Хаягийн мэдээлэл оруулах
        </Typography>
      </Stack>
    </Stack>
  );
};
export default InProgress;
