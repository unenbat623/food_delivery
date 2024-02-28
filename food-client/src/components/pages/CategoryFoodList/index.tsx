import {
  Button,
  Container,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import FoodCard from "../FoodList/Card/Card";
import Link from "next/link";

const CategoryFoodList = ({ categories, foods }: any) => {
  const [selectedCategory, setSelectedCategory] = useState("Үндсэн хоол");
  const [selectedFoods, setSelectedFoods] = useState<{}[]>([]);
  return (
    <Container>
      <Stack direction={"row"} spacing={4}>
        {categories.map((cat: any, i: number) => (
          <Button
            key={i}
            variant={selectedCategory === cat ? "contained" : "outlined"}
            fullWidth
            sx={{ color: selectedCategory === cat ? "white" : "" }}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </Stack>

      <Grid container>
        {!foods && (
          <Stack
            width={"100%"}
            direction="row"
            justifyContent="space-between"
            gap={10}
          >
            <Skeleton height={200} width={"100%"}></Skeleton>
            <Skeleton height={200} width={"100%"}></Skeleton>
            <Skeleton height={200} width={"100%"}></Skeleton>
            <Skeleton height={200} width={"100%"}></Skeleton>
          </Stack>
        )}

        {selectedFoods?.map((food: any) => (
          <FoodCard key={food?._id} food={food} />
        ))}
      </Grid>
    </Container>
  );
};

export default CategoryFoodList;
