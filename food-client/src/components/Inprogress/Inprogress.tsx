"use client";

import { Stack, Typography } from "@mui/material";
import Image from "next/image";

export const InProgress = () => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      paddingY={2}
      paddingX={3}
      gap={2}
    >
      <Image src="/State.svg" width={50} height={50} alt="" />
      <Stack gap={"4px"}>
        <Typography color={"#8B8E95"} fontSize={14} fontWeight={400}>
          Алхам 2
        </Typography>
        <Typography fontSize={20} fontWeight={400}>
          Хаягийн мэдээлэл оруулах
        </Typography>
        <Typography color={"#0468C8"} fontSize={16} fontWeight={400}>
          Хүлээгдэж байна
        </Typography>
      </Stack>
    </Stack>
  );
};
