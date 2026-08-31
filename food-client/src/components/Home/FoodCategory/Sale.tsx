"use client";

import React from "react";
import { Container, Stack, Typography, Grid, Box, Button } from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";
import { useFood } from "@/context/FoodProvider";
import FoodCard from "@/components/FoodList/Card/Card";

export const Sale = () => {
  const { foods } = useFood();
  const saleFoods = foods.filter((f) => f.isSale).slice(0, 4);

  if (saleFoods.length === 0) return null;

  return (
    <Container maxWidth="xl" sx={{ mb: 8 }} id="sale-section">
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
                bgcolor: "#fee2e2",
                color: "#ef4444",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LocalOfferIcon fontSize="small" />
            </Box>
            <Typography variant="h5" fontWeight={800} color="#1e293b">
              Хямдралтай амтат зоог
            </Typography>
          </Stack>

          <Link href="/menu?category=cat_sale" style={{ textDecoration: "none" }}>
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
          {saleFoods.map((food) => (
            <Grid key={food._id} item xs={12} sm={6} md={3}>
              <FoodCard food={food} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
};
