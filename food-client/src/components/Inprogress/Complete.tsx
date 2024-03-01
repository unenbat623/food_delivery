"use client";

import { Stack, Typography } from "@mui/material";

export const Completed = () => {
  return (
    <Stack paddingY={2} paddingX={3} gap={2}>
      <Stack borderRadius={"50%"} bgcolor={"#18BA51"} padding={1.5}>
        <img src="/check (1).svg" alt="" />
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
