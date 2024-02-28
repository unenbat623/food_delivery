"use client";

import CategoryFoodList from "@/components/pages/FoodList/index";

import { Grid } from "@mui/material";
import React from "react";

const CategoryPage = () => {
  return (
    <Grid container sx={{ mt: 5 }}>
      <CategoryFoodList
        categories={["Үндсэн хоол", "Зууш", "Ундаа", "Хямдралтай"]}
      />
    </Grid>
  );
};

export default CategoryPage;
