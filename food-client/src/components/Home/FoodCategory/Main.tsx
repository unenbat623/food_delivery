"use client";

import React from "react";
import { Container, Stack, Typography, Grid, Box, Button } from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";
import { useFood } from "@/context/FoodProvider";
import FoodCard from "@/components/FoodList/Card/Card";

export const Main = () => {
  const { foods } = useFood();
  const mainFoods = foods.filter((f) => f.category === "cat_main" || f.category === "cat_all" || !f.isSale).slice(0, 4);

  if (mainFoods.length === 0) return null;

  return (
    <Container maxWidth="xl" sx={{ mb: 8 }}>
      <Stack spacing={3}>
        {/* Section Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pb: 1,
            borderBottom: "2px solid #f1f5f9",
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "10px",
                bgcolor: "rgba(24, 186, 81, 0.1)",
                color: "#18BA51",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <RestaurantIcon fontSize="small" />
            </Box>
            <Typography variant="h5" fontWeight={800} color="#1e293b">
              Үндсэн хоол
            </Typography>
          </Stack>

          <Link href="/menu?category=cat_main" style={{ textDecoration: "none" }}>
            <Button
              endIcon={<ArrowForwardIcon fontSize="small" />}
              sx={{
                color: "#18BA51",
                fontWeight: 700,
                fontSize: "0.9rem",
                "&:hover": { bgcolor: "rgba(24, 186, 81, 0.08)" },
              }}
            >
              Бүгдийг харах
            </Button>
          </Link>
        </Box>

        {/* Food Grid */}
        <Grid container spacing={3}>
          {mainFoods.map((food) => (
            <Grid key={food._id} item xs={12} sm={6} md={3}>
              <FoodCard food={food} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
};
