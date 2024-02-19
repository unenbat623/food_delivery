"use client";

import { Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Button } from "@mui/material";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Link from "next/link";
import { useState } from "react";

export const CartCard = () => {
  const [count, setCount] = useState(1);

  return (
    <Container maxWidth="xl">
      <Stack width={"100%"} height={"90vh"} justifyContent={"space-between"}>
        <Stack gap={5}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Stack padding={"6px"}>
              <Image
                src="/arrow_forward_ios.svg"
                alt=""
                width={11}
                height={20}
              />
            </Stack>
            <Typography width={"57.6%"} fontSize={20} fontWeight={900}>
              Таны сагс
            </Typography>
          </Stack>
          <Stack paddingY={3} borderTop={1} borderBottom={1}>
            <Stack
              padding={2}
              gap={2}
              height={"100%"}
              width={"100%"}
              direction={"row"}
              alignItems={"center"}
            >
              <Stack width={"50%"}>
                <Image src="/image (1).svg" alt="" width={245} height={150} />
              </Stack>
              <Stack width={"50%"}>
                <Stack
                  direction={"row"}
                  width={"100%"}
                  justifyContent={"space-between"}
                >
                  <Stack>
                    <Typography fontSize={18} fontWeight={600}>
                      Main Pizza{" "}
                    </Typography>
                    <Typography
                      color={"primary.main"}
                      fontSize={18}
                      fontWeight={600}
                    >
                      34,800₮
                    </Typography>
                  </Stack>
                  <Stack alignSelf={"center"}>
                    <CloseOutlinedIcon />
                  </Stack>
                </Stack>
                <Typography padding={1} color={"#767676"}>
                  Хулуу, төмс, лууван , сонгино, цөцгийн тос, самрын үр
                </Typography>
                <Stack
                  spacing={2.5}
                  direction={"row"}
                  justifyContent={"start"}
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
                    onClick={() => {
                      setCount((prev) => prev - 1);
                    }}
                  >
                    <RemoveOutlinedIcon />
                  </Stack>
                  <Stack paddingX={"30px"} paddingY={1}>
                    <Typography fontSize={24} fontWeight={500}>
                      {count}
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
                    onClick={() => {
                      setCount((prev) => prev + 1);
                    }}
                  >
                    <AddOutlinedIcon />
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack direction={"row"} alignItems={"center"}>
          <Stack width={"50%"}>
            <Typography color={"#5E6166"} fontSize={18} fontWeight={400}>
              Нийт төлөх дүн
            </Typography>
            <Typography color={"#121316"} fontSize={18} fontWeight={700}>
              34,800₮
            </Typography>
          </Stack>
          <Stack width={"50%"}>
            <Link href={"/order"}>
              <Button
                fullWidth
                variant="contained"
                disableElevation
                sx={{
                  py: "14.5px",
                  bgcolor: "#18BA51",
                }}
              >
                Захиалах
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};
