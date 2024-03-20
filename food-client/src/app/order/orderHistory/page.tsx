"use client";

import { Address } from "@/components/Order/address";
import { OrderCard } from "@/components/Order/orderCard";
import { Container, Stack } from "@mui/material";

export default function OrderHistory() {
  return (
    <Stack width={"100vw"} height={"70vw"} marginTop={5}>
      <Container maxWidth="xl">
        <Stack
          width={"100%"}
          direction={"row"}
          justifyContent={"space-around"}
          alignItems={"center"}
          paddingTop={"1px"}
        >
          <Address />
          <OrderCard />
        </Stack>
      </Container>
    </Stack>
  );
}
