import { Stack, Typography } from "@mui/material";
import Image from "next/image";

export const Card = () => {
  return (
    <Stack spacing={1.75}>
      <Stack position={"relative"}>
        <Stack position={"relative"} width={"100%"} pt="66.6%" top={0} left={0}>
          <Image
            style={{
              borderRadius: "16px",
              position: "absolute",
              objectFit: "cover",
            }}
            src="/food.svg"
            alt=""
            fill
          />
        </Stack>
      </Stack>
      <Stack>
        <Typography fontSize={20} fontWeight={590}>
          Өглөөний хоол
        </Typography>
        <Stack direction={"row"} spacing={1.9}>
          <Typography color={"#18BA51"} fontSize={18} fontWeight={590}>
            4,800₮
          </Typography>
          <Typography
            sx={{
              textDecorationLine: "line-through",
            }}
            fontSize={18}
            fontWeight={590}
          >
            6,800₮
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
