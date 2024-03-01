"use client";

import { Address } from "@/components/Order/address";
import { OrderCard } from "@/components/Order/orderCard";
import { Container, Stack } from "@mui/material";

export default function Order() {
  return (
    <Stack width={"100vw"} height={"92vh"}>
      <Container maxWidth="xl">
        <Stack
          width={"100%"}
          direction={"row"}
          justifyContent={"space-around"}
          alignItems={"center"}
          paddingTop={"8%"}
        >
          <Address />
          <OrderCard />
        </Stack>
      </Container>
    </Stack>
  );
}
