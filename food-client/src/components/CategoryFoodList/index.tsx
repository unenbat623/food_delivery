"use client";

import React from "react";
import { Container, Grid, Stack, Button } from "@mui/material";
import FoodCard from "../FoodList/Card/Card";
import { useFood } from "@/context/FoodProvider";

const CategoryFoodList = () => {
  const { foods, categories, selectedCategory, setSelectedCategory } = useFood();

  const filteredFoods = foods.filter((f) => {
    if (selectedCategory === "cat_all") return true;
    if (selectedCategory === "cat_sale") return f.isSale;
    return f.category === selectedCategory;
  });

  return (
    <Container maxWidth="xl" sx={{ my: 4 }}>
      <Stack direction="row" spacing={1.5} sx={{ mb: 4, overflowX: "auto", pb: 1 }}>
        {categories.map((cat) => (
          <Button
            key={cat._id}
            variant={selectedCategory === cat._id ? "contained" : "outlined"}
            onClick={() => setSelectedCategory(cat._id)}
            sx={{
              borderRadius: "10px",
              px: 2.5,
              fontWeight: 700,
              bgcolor: selectedCategory === cat._id ? "#18BA51" : "#ffffff",
              color: selectedCategory === cat._id ? "#ffffff" : "#475569",
              borderColor: selectedCategory === cat._id ? "#18BA51" : "#e2e8f0",
              whiteSpace: "nowrap",
            }}
          >
            {cat.name}
          </Button>
        ))}
      </Stack>

      <Grid container spacing={3}>
        {filteredFoods.map((food) => (
          <Grid key={food._id} item xs={12} sm={6} md={3}>
            <FoodCard food={food} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CategoryFoodList;
