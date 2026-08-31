"use client";

import React from "react";
import { Box } from "@mui/material";
import { Sale } from "./Sale";
import { Main } from "./Main";
import { Salad } from "./Salad";
import { Desert } from "./Desert";

export const All = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Sale />
      <Main />
      <Salad />
      <Desert />
    </Box>
  );
};
