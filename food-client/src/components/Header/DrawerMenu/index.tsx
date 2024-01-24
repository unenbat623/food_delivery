"use client";

import * as React from "react";
import { useState } from "react";

import { Drawer } from "@mui/material";

interface ILoginProps {
  handleClose: () => void;
  open: boolean;
}

export default function DrawerMenu({ handleClose, open }: ILoginProps) {
  return (
    <Drawer anchor={"right"} open={open} onClose={handleClose}>
      <h1>Welcome</h1>
    </Drawer>
  );
}
