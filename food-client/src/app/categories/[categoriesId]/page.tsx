"use client";

import React from "react";
import { Container, Typography, Grid } from "@mui/material";
import { useFood } from "@/context/FoodProvider";
import FoodCard from "@/components/FoodList/Card/Card";
import { useParams } from "next/navigation";

export default function CategoryPage() {
  const params = useParams();
  const { foods, categories } = useFood();

  const categoryId = params?.categoriesId as string;
  const currentCategory = categories.find((c) => c._id === categoryId);

  const filteredFoods = foods.filter((f) => {
    if (categoryId === "cat_all") return true;
    if (categoryId === "cat_sale") return f.isSale;
    return f.category === categoryId;
  });

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight={900} color="#1e293b" sx={{ mb: 4 }}>
        {currentCategory?.name || "Хоолны ангилал"}
      </Typography>
      <Grid container spacing={3}>
        {filteredFoods.map((food) => (
          <Grid key={food._id} item xs={12} sm={6} md={3}>
            <FoodCard food={food} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
