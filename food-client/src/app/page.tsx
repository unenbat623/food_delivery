"use client";

import React from "react";
import { Box } from "@mui/material";
import HomeProfile from "@/components/Home/HomeProfile";
import HomeHeader from "@/components/Home/HomeHeader";
import { All } from "@/components/Home/FoodCategory/All";

export default function Home() {
  return (
    <Box sx={{ width: "100%", pb: 8 }}>
      <HomeProfile />
      <HomeHeader />
      <All />
    </Box>
  );
}
