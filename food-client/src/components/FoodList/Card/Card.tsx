"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Chip,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import StarIcon from "@mui/icons-material/Star";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { IFood } from "@/types/food";
import { useFood } from "@/context/FoodProvider";
import { useBasket } from "@/context/BasketProvider";

interface IFoodProps {
  food: IFood;
}

const FoodCard: React.FC<IFoodProps> = ({ food }) => {
  const { openFoodModal } = useFood();
  const { addFoodToBasket } = useBasket();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addFoodToBasket(food, 1);
  };

  const displayPrice = food.isSale && food.discountPrice ? food.discountPrice : food.price;
  const originalPrice = food.price;

  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: "18px",
        overflow: "hidden",
        border: "1px solid #f1f5f9",
        bgcolor: "#ffffff",
        boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
        transition: "all 0.25s ease-in-out",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 14px 30px rgba(0,0,0,0.09)",
          borderColor: "rgba(24, 186, 81, 0.3)",
        },
      }}
    >
      <CardActionArea
        onClick={() => openFoodModal(food)}
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: "flex-start",
        }}
      >
        {/* Image Container */}
        <Box sx={{ position: "relative", width: "100%", pt: "62%" }}>
          <CardMedia
            component="img"
            image={food.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"}
            alt={food.name}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          {/* Discount Chip */}
          {food.isSale && (
            <Chip
              label={`-${food.discountPercent || 20}%`}
              size="small"
              sx={{
                position: "absolute",
                top: 12,
                left: 12,
                bgcolor: "#ef4444",
                color: "#ffffff",
                fontWeight: 800,
                fontSize: "0.75rem",
                borderRadius: "8px",
              }}
            />
          )}

          {/* Rating Chip */}
          {food.rating && (
            <Box
              sx={{
                position: "absolute",
                top: 12,
                right: 12,
                bgcolor: "rgba(0, 0, 0, 0.65)",
                color: "#ffffff",
                px: 1,
                py: 0.25,
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                fontSize: "0.75rem",
                fontWeight: 700,
                backdropFilter: "blur(4px)",
              }}
            >
              <StarIcon sx={{ fontSize: 14, color: "#facc15" }} />
              {food.rating}
            </Box>
          )}

          {/* Prep time chip */}
          {food.prepTime && (
            <Box
              sx={{
                position: "absolute",
                bottom: 10,
                left: 12,
                bgcolor: "rgba(255, 255, 255, 0.9)",
                color: "#334155",
                px: 1,
                py: 0.25,
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                fontSize: "0.7rem",
                fontWeight: 600,
              }}
            >
              <AccessTimeIcon sx={{ fontSize: 12, color: "#18BA51" }} />
              {food.prepTime}
            </Box>
          )}
        </Box>

        {/* Content */}
        <CardContent sx={{ p: 2.25, flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <Box>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{
                fontWeight: 700,
                fontSize: "1.05rem",
                color: "#1e293b",
                lineHeight: 1.3,
                mb: 0.75,
              }}
            >
              {food.name}
            </Typography>

            <Typography
              variant="body2"
              color="#64748b"
              sx={{
                fontSize: "0.825rem",
                lineHeight: 1.4,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                minHeight: "2.8em",
                mb: 1.5,
              }}
            >
              {food.ingredients || food.description}
            </Typography>
          </Box>

          {/* Price & Quick Add Button */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              pt: 1,
              borderTop: "1px solid #f8fafc",
            }}
          >
            <Box>
              <Typography
                sx={{
                  color: "#18BA51",
                  fontWeight: 800,
                  fontSize: "1.15rem",
                  lineHeight: 1,
                }}
              >
                {displayPrice.toLocaleString()}₮
              </Typography>
              {food.isSale && (
                <Typography
                  sx={{
                    color: "#94a3b8",
                    fontSize: "0.8rem",
                    textDecoration: "line-through",
                    fontWeight: 500,
                    mt: 0.25,
                  }}
                >
                  {originalPrice.toLocaleString()}₮
                </Typography>
              )}
            </Box>

            <IconButton
              onClick={handleQuickAdd}
              sx={{
                bgcolor: "rgba(24, 186, 81, 0.12)",
                color: "#18BA51",
                p: 1,
                borderRadius: "10px",
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: "#18BA51",
                  color: "#ffffff",
                  transform: "scale(1.08)",
                },
              }}
              aria-label="Add to cart"
            >
              <AddShoppingCartIcon fontSize="small" />
            </IconButton>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default FoodCard;
