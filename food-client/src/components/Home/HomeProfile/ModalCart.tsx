import { Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { Button } from "@mui/material";

export const OrderDetail = () => {
  return (
    <Stack>
      <Stack
        position={"fixed"}
        top={0}
        left={0}
        width={"screen"}
        height={"screen"}
        bgcolor={"red"}
        zIndex={10}
      ></Stack>
      <Stack>
        <Container maxWidth="xl">
          <Stack
            position={"absolute"}
            zIndex={20}
            top={"25%"}
            left={"25%"}
            bgcolor={"#fff"}
            width={"50%"}
            padding={4}
            spacing={4}
            borderRadius={2}
            direction={"row"}
          >
            <Image src="/image.svg" alt="" width={500} height={500} />

            <Stack justifyContent={"space-between"}>
              <Stack alignSelf={"end"}>
                <CloseOutlinedIcon />
              </Stack>
              <Stack spacing={4}>
                <Stack>
                  <Typography fontSize={28} fontWeight={700}>
                    Main Pizza{" "}
                  </Typography>
                  <Typography color={"#18BA51"} fontSize={18} fontWeight={600}>
                    34,800₮
                  </Typography>
                </Stack>
                <Stack spacing={1.5}>
                  <Typography fontSize={18} fontWeight={600}>
                    Орц
                  </Typography>
                  <Typography padding={1} bgcolor={"#F6F6F6"} color={"#767676"}>
                    Хулуу, төмс, лууван , сонгино, цөцгийн тос, самрын үр
                  </Typography>
                </Stack>
                <Typography fontSize={18} fontWeight={600}>
                  Тоо
                </Typography>
                <Stack
                  spacing={2.5}
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Stack
                    width={"45px"}
                    height={"40px"}
                    borderRadius={"10px"}
                    bgcolor={"#18BA51"}
                    color={"#fff"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <RemoveOutlinedIcon />
                  </Stack>
                  <Stack paddingX={"30px"} paddingY={1}>
                    <Typography fontSize={24} fontWeight={500}>
                      1
                    </Typography>
                  </Stack>
                  <Stack
                    width={"45px"}
                    height={"40px"}
                    borderRadius={"10px"}
                    bgcolor={"#18BA51"}
                    color={"#fff"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <AddOutlinedIcon />
                  </Stack>
                </Stack>
                <Button
                  fullWidth
                  variant="contained"
                  disableElevation
                  sx={{
                    py: "14.5px",
                    bgcolor: "#18BA51",
                  }}
                >
                  Сагслах
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Stack>
    </Stack>
  );
};
