import { Stack } from "@mui/material";
import { Typography } from "@mui/material";

export const OrderDetails = () => {
  return (
    <Stack
      minHeight={"800px"}
      maxWidth={"432px"}
      width={"100%"}
      height={"100%"}
      border={1}
      borderRadius={2}
    >
      <Stack padding={3}>
        <Typography fontSize={20} fontWeight={400}>
          Захиалгын дэлгэрэнгүй
        </Typography>
      </Stack>
    </Stack>
  );
};
