import { Container, Stack, Typography, Grid } from "@mui/material";
import Image from "next/image";
import { relative } from "path";
import { CardSale } from "../HomeProfile/CardSale";
import { Card } from "../HomeProfile/Card";
import Link from "next/link";

const arr = [
  {
    image: "/food.svg",
    discount: "20%",
    name: " Өглөөний хоол",
    price: " 4,800₮",
    oldprice: "6,800₮",
  },
  {
    image: "/food.svg",
    discount: "20%",
    name: " Өглөөний хоол",
    price: " 4,800₮",
    oldprice: "6,800₮",
  },
  {
    image: "/food.svg",
    discount: "20%",
    name: " Өглөөний хоол",
    price: " 4,800₮",
    oldprice: "6,800₮",
  },
  {
    image: "/food.svg",
    discount: "20%",
    name: " Өглөөний хоол",
    price: " 4,800₮",
    oldprice: "6,800₮",
  },
];

export const Sale = () => {
  return (
    <Stack>
      <Container maxWidth="xl">
        <Stack gap={3}>
          <Stack
            padding={2}
            width={"100%"}
            direction={"row"}
            justifyContent={"space-between"}
          >
            <Stack gap={1} direction={"row"} alignItems={"center"}>
              <Image src="Star.svg" alt="" width={32} height={32} />
              <Typography fontSize={22} fontWeight={700}>
                 Хямдралтай
              </Typography>
            </Stack>
            <Link href={"/food-menu"}>
              <Stack gap={2} direction={"row"} alignItems={"center"}>
                <Typography color={"#18BA51"} fontSize={14} fontWeight={400}>
                  Бүгдийг харах
                </Typography>
                <Image src="Right.svg" alt="" width={10} height={15} />
              </Stack>
            </Link>
          </Stack>
          <Grid container spacing={3}>
            {arr.map((_, index) => (
              <Grid key={index} item xs={12} md={3}>
                <CardSale />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Stack>
  );
};
