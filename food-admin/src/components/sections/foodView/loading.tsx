"use client";

import { CircularProgress, Stack } from "@mui/material";
import React from "react";

const PageLoading = () => {
  return (
    <Stack height={"100%"} flex={1} alignItems="center" justifyContent="center">
      <CircularProgress />
    </Stack>
  );
};

export default PageLoading;
