"use client";

import { Stack, Typography } from "@mui/material";

export const InProgress = () => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      paddingY={2}
      paddingX={3}
      gap={2}
    >
      <Stack
        border={1}
        width={"50px"}
        height={"50px"}
        borderRadius={"50%"}
        borderColor={"#0468C8"}
        padding={1.5}
      >
        <Stack
          width={24}
          height={24}
          borderRadius={"50%"}
          bgcolor={"#0468C8"}
        ></Stack>
      </Stack>
      <Stack gap={"4px"}>
        <Typography color={"#8B8E95"} fontSize={14} fontWeight={400}>
          Алхам 1
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
