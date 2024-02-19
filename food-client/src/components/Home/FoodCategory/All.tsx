"use client";

import { Stack } from "@mui/material";
import { Sale } from "./Sale";
import { Salad } from "./Salad";
import { Main } from "./Main";
import { Desert } from "./Desert";

export const All = () => {
  return (
    <Stack spacing={10} paddingY={"122px"}>
      <Sale />
      <Main />
      <Salad />
      <Desert />
    </Stack>
  );
};
