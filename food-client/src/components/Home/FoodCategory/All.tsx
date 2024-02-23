"use client";

import { Box, Container, Grid } from "@mui/material";
import { Sale } from "./Sale";
import { Salad } from "./Salad";
import { Main } from "./Main";
import { Desert } from "./Desert";

export const All = () => {
  return (
    <Grid container>
      <Sale />
      <Salad />
      <Main />
      <Desert />
    </Grid>
  );
};
