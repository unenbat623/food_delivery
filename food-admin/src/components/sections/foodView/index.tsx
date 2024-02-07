"use client";

import { useState } from "react";

import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import FoodCard from "./food-card";
import FoodSort from "./food-sort";
// import ProductFilters from "./product-filters";
// import ProductCartWidget from "./product-cart-widget";

// ----------------------------------------------------------------------
import { sample } from "lodash";
import { faker } from "@faker-js/faker";
import { Button } from "@mui/material";
import Iconify from "@/components/iconify";

// ----------------------------------------------------------------------

const FOOD_NAME = [
  "Nike Air Force 1 NDESTRUKT",
  "Nike Space Hippie 04",
  "Nike Air Zoom Pegasus 37 A.I.R. Chaz Bear",
  "Nike Blazer Low 77 Vintage",
  "Nike ZoomX SuperRep Surge",
  "Zoom Freak 2",
  "Nike Air Max Zephyr",
  "Jordan Delta",
];
const FOOD_COLOR = [
  "#00AB55",
  "#000000",
  "#FFFFFF",
  "#FFC0CB",
  "#FF4842",
  "#1890FF",
  "#94D82D",
  "#FFC107",
];

// ----------------------------------------------------------------------

export const products = [...Array(FOOD_NAME.length)].map((_, index) => {
  const setIndex = index + 1;

  return {
    id: faker.string.uuid(),
    cover: `/assets/images/products/product_${setIndex}.jpg`,
    name: FOOD_NAME[index],
    price: faker.number.int({ min: 4, max: 99 }),
    priceSale: setIndex % 3 ? null : faker.number.int({ min: 19, max: 29 }),
    colors:
      (setIndex === 1 && FOOD_COLOR.slice(0, 2)) ||
      (setIndex === 2 && FOOD_COLOR.slice(1, 3)) ||
      (setIndex === 3 && FOOD_COLOR.slice(2, 4)) ||
      (setIndex === 4 && FOOD_COLOR.slice(3, 6)) ||
      (setIndex === 23 && FOOD_COLOR.slice(4, 6)) ||
      (setIndex === 24 && FOOD_COLOR.slice(5, 6)) ||
      FOOD_COLOR,
    status: sample(["sale", "new", "", ""]),
  };
});

// ----------------------------------------------------------------------

export default function FoodView() {
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" sx={{ mb: 5 }}>
          Хоолны жагсаалт
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          Шинэ хоол
        </Button>
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 2 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          {/* <ProductFilters
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          /> */}

          <FoodSort />
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {products.map((product: any) => (
          <Grid key={product.id} xs={12} sm={6} md={3}>
            <FoodCard product={product} />
          </Grid>
        ))}
      </Grid>

      {/* <ProductCartWidget /> */}
    </Container>
  );
}
