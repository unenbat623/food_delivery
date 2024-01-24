"use client";

import NewPassword from "@/components/pages/NewPassword";
import ResetEmailPassword from "@/components/pages/ResetEmailPassword";
import ResetPassword from "@/components/pages/ResetPassword";
import { Stack } from "@mui/material";
import React from "react";

const Page = () => {
  return (
    <Stack>
      <ResetPassword />
      <ResetEmailPassword />
      <NewPassword />
    </Stack>
  );
};

export default Page;
