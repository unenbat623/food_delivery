"use client";

import React from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import FoodCard from "./Card/Card";
import { IFood } from "@/types/food";

interface FoodListProps {
  category?: { name: string };
  foods: IFood[];
}

const FoodList: React.FC<FoodListProps> = ({ category, foods }) => {
  return (
    <Container maxWidth="xl" sx={{ my: 4 }}>
      {category && (
        <Typography variant="h5" fontWeight={800} color="#1e293b" sx={{ mb: 3 }}>
          {category.name}
        </Typography>
      )}
      <Grid container spacing={3}>
        {foods?.map((food) => (
          <Grid key={food._id} item xs={12} sm={6} md={3}>
            <FoodCard food={food} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FoodList;
