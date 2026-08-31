"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Stack,
  InputBase,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useFood } from "@/context/FoodProvider";
import FoodCard from "@/components/FoodList/Card/Card";
import { useSearchParams } from "next/navigation";

function MenuContent() {
  const searchParams = useSearchParams();
  const { foods, categories, selectedCategory, setSelectedCategory, searchQuery, setSearchQuery } = useFood();

  const [sortOption, setSortOption] = useState<string>("default");

  // Read URL query params on mount if available
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams, setSelectedCategory]);

  const filteredFoods = useMemo(() => {
    return foods.filter((food) => {
      // Category filter
      let matchesCategory = true;
      if (selectedCategory === "cat_sale") {
        matchesCategory = !!food.isSale;
      } else if (selectedCategory && selectedCategory !== "cat_all") {
        matchesCategory = food.category === selectedCategory;
      }

      // Search query filter
      let matchesSearch = true;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const inName = food.name.toLowerCase().includes(query);
        const inDesc = food.description ? food.description.toLowerCase().includes(query) : false;
        const inIngr = food.ingredients ? food.ingredients.toLowerCase().includes(query) : false;
        matchesSearch = Boolean(inName || inDesc || inIngr);
      }

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      const priceA = a.isSale && a.discountPrice ? a.discountPrice : a.price;
      const priceB = b.isSale && b.discountPrice ? b.discountPrice : b.price;

      if (sortOption === "price_asc") return priceA - priceB;
      if (sortOption === "price_desc") return priceB - priceA;
      if (sortOption === "rating") return (b.rating || 0) - (a.rating || 0);
      return 0;
    });
  }, [foods, selectedCategory, searchQuery, sortOption]);

  const handleResetFilters = () => {
    setSelectedCategory("cat_all");
    setSearchQuery("");
    setSortOption("default");
  };

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
      {/* Page Header */}
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 900,
            fontSize: { xs: "2rem", md: "2.75rem" },
            color: "#1e293b",
            mb: 1.5,
          }}
        >
          Хоолны цэс
        </Typography>
        <Typography variant="body1" color="#64748b" sx={{ maxWidth: 600, mx: "auto" }}>
          Өдөр бүрийн шинэхэн, амтат өглөөний цай, үндсэн хоол, халуун шөл, салат, десертүүдээс сонголтоо хийнэ үү.
        </Typography>
      </Box>

      {/* Category Tabs */}
      <Box
        sx={{
          display: "flex",
          gap: 1.5,
          overflowX: "auto",
          pb: 2,
          mb: 4,
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {categories.map((category) => {
          const isSelected = selectedCategory === category._id;
          return (
            <Button
              key={category._id}
              onClick={() => setSelectedCategory(category._id)}
              variant={isSelected ? "contained" : "outlined"}
              sx={{
                borderRadius: "12px",
                px: 3,
                py: 1.2,
                fontSize: "0.925rem",
                fontWeight: isSelected ? 700 : 600,
                whiteSpace: "nowrap",
                bgcolor: isSelected ? "#18BA51" : "#ffffff",
                color: isSelected ? "#ffffff" : "#475569",
                borderColor: isSelected ? "#18BA51" : "#e2e8f0",
                boxShadow: isSelected ? "0 4px 14px rgba(24, 186, 81, 0.3)" : "none",
                "&:hover": {
                  bgcolor: isSelected ? "#15803d" : "#f8fafc",
                  borderColor: isSelected ? "#15803d" : "#cbd5e1",
                },
              }}
            >
              {category.name}
            </Button>
          );
        })}
      </Box>

      {/* Search & Sort Bar */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", sm: "center" }}
        sx={{
          p: 2,
          bgcolor: "#ffffff",
          borderRadius: "16px",
          border: "1px solid #f1f5f9",
          boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
          mb: 4,
        }}
      >
        {/* Search Field */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: "#f8fafc",
            borderRadius: "10px",
            px: 2,
            py: 0.75,
            flex: { sm: "0 1 340px" },
          }}
        >
          <SearchIcon sx={{ color: "#94a3b8", mr: 1, fontSize: 20 }} />
          <InputBase
            placeholder="Цэснээс хайх..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ fontSize: "0.9rem", width: "100%" }}
          />
        </Box>

        {/* Sort & Count */}
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
          <Typography fontSize="0.875rem" fontWeight={600} color="#64748b">
            Нийт <b style={{ color: "#18BA51" }}>{filteredFoods.length}</b> хоол
          </Typography>

          <FormControl size="small" sx={{ minWidth: 170 }}>
            <InputLabel id="sort-select-label">Эрэмбэлэх</InputLabel>
            <Select
              labelId="sort-select-label"
              value={sortOption}
              label="Эрэмбэлэх"
              onChange={(e) => setSortOption(e.target.value)}
              sx={{ borderRadius: "10px", fontSize: "0.85rem" }}
            >
              <MenuItem value="default">Энгийн</MenuItem>
              <MenuItem value="price_asc">Үнэ: Багаас их</MenuItem>
              <MenuItem value="price_desc">Үнэ: Ихээс бага</MenuItem>
              <MenuItem value="rating">Үнэлгээгээр</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Stack>

      {/* Food Items Grid */}
      {filteredFoods.length === 0 ? (
        <Box
          sx={{
            py: 12,
            textAlign: "center",
            bgcolor: "#ffffff",
            borderRadius: "20px",
            border: "1px solid #f1f5f9",
          }}
        >
          <Typography variant="h6" fontWeight={700} color="#1e293b" gutterBottom>
            Таны хайсан хоол олдсонгүй
          </Typography>
          <Typography variant="body2" color="#64748b" sx={{ mb: 3 }}>
            Хайлтын үгээ өөрчлөх эсвэл бүх ангиллыг харна уу.
          </Typography>
          <Button
            variant="outlined"
            onClick={handleResetFilters}
            startIcon={<RestartAltIcon />}
            sx={{
              color: "#18BA51",
              borderColor: "#18BA51",
              borderRadius: "10px",
              fontWeight: 700,
              "&:hover": { bgcolor: "rgba(24, 186, 81, 0.08)" },
            }}
          >
            Хайлтыг сэргээх
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredFoods.map((food) => (
            <Grid key={food._id} item xs={12} sm={6} md={4} lg={3}>
              <FoodCard food={food} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress color="primary" /></Box>}>
      <MenuContent />
    </Suspense>
  );
}
