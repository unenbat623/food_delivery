"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  Modal,
  Grid,
  Stack,
  Chip,
  Fade,
  Backdrop,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import StarIcon from "@mui/icons-material/Star";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import { useFood } from "@/context/FoodProvider";
import { useBasket } from "@/context/BasketProvider";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "92%", sm: "85%", md: 780 },
  maxWidth: 820,
  maxHeight: "92vh",
  overflowY: "auto",
  bgcolor: "#ffffff",
  boxShadow: "0 25px 60px rgba(0,0,0,0.2)",
  borderRadius: { xs: "20px", md: "24px" },
  p: { xs: 2.5, sm: 3.5, md: 4 },
  outline: "none",
};

export default function ModalBox() {
  const { isModalOpen, selectedFoodForModal, closeFoodModal } = useFood();
  const { addFoodToBasket } = useBasket();
  const [count, setCount] = useState<number>(1);

  // Reset count whenever a new food is opened
  useEffect(() => {
    setCount(1);
  }, [selectedFoodForModal]);

  if (!selectedFoodForModal) return null;

  const food = selectedFoodForModal;
  const unitPrice = food.isSale && food.discountPrice ? food.discountPrice : food.price;
  const totalPrice = unitPrice * count;

  const handleCount = (type: "inc" | "dec") => {
    if (type === "inc") {
      setCount((prev) => prev + 1);
    } else if (type === "dec" && count > 1) {
      setCount((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addFoodToBasket(food, count);
    closeFoodModal();
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={closeFoodModal}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 300,
          sx: { bgcolor: "rgba(15, 23, 42, 0.6)", backdropFilter: "blur(4px)" },
        },
      }}
    >
      <Fade in={isModalOpen}>
        <Box sx={style}>
          {/* Close Button */}
          <IconButton
            onClick={closeFoodModal}
            sx={{
              position: "absolute",
              right: 16,
              top: 16,
              bgcolor: "#f1f5f9",
              color: "#64748b",
              zIndex: 10,
              "&:hover": { bgcolor: "#e2e8f0", color: "#1e293b" },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>

          <Grid container spacing={{ xs: 2.5, md: 4 }} alignItems="center">
            {/* Food Image */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: { xs: 220, sm: 300, md: 360 },
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                }}
              >
                <Box
                  component="img"
                  src={food.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"}
                  alt={food.name}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />

                {food.isSale && (
                  <Chip
                    label={`-${food.discountPercent || 20}% ХЯМДРАЛ`}
                    sx={{
                      position: "absolute",
                      top: 14,
                      left: 14,
                      bgcolor: "#ef4444",
                      color: "#fff",
                      fontWeight: 800,
                      fontSize: "0.8rem",
                    }}
                  />
                )}
              </Box>
            </Grid>

            {/* Food Details & Controls */}
            <Grid item xs={12} md={6}>
              <Stack spacing={2.5}>
                {/* Title & Badges */}
                <Box>
                  <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
                    {food.rating && (
                      <Box
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 0.5,
                          bgcolor: "#fef3c7",
                          color: "#d97706",
                          px: 1,
                          py: 0.25,
                          borderRadius: "6px",
                          fontWeight: 700,
                          fontSize: "0.8rem",
                        }}
                      >
                        <StarIcon sx={{ fontSize: 15 }} />
                        {food.rating}
                      </Box>
                    )}
                    {food.prepTime && (
                      <Box
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 0.5,
                          bgcolor: "rgba(24, 186, 81, 0.1)",
                          color: "#18BA51",
                          px: 1,
                          py: 0.25,
                          borderRadius: "6px",
                          fontWeight: 600,
                          fontSize: "0.8rem",
                        }}
                      >
                        <AccessTimeIcon sx={{ fontSize: 15 }} />
                        {food.prepTime}
                      </Box>
                    )}
                    {food.portion && (
                      <Typography fontSize="0.8rem" color="text.secondary">
                        ({food.portion})
                      </Typography>
                    )}
                  </Stack>

                  <Typography variant="h5" fontWeight={800} color="#1e293b" sx={{ lineHeight: 1.2 }}>
                    {food.name}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "baseline", gap: 1.5, mt: 1 }}>
                    <Typography fontSize="1.5rem" fontWeight={900} color="#18BA51">
                      {unitPrice.toLocaleString()}₮
                    </Typography>
                    {food.isSale && (
                      <Typography
                        fontSize="1.05rem"
                        fontWeight={500}
                        color="#94a3b8"
                        sx={{ textDecoration: "line-through" }}
                      >
                        {food.price.toLocaleString()}₮
                      </Typography>
                    )}
                  </Box>
                </Box>

                {/* Description */}
                <Typography fontSize="0.9rem" color="#475569" lineHeight={1.6}>
                  {food.description}
                </Typography>

                {/* Ingredients */}
                <Box>
                  <Typography fontWeight={700} fontSize="0.9rem" color="#1e293b" sx={{ mb: 0.75 }}>
                    Орц найрлага:
                  </Typography>
                  <Box
                    sx={{
                      p: 1.5,
                      bgcolor: "#f8fafc",
                      borderRadius: "12px",
                      border: "1px solid #f1f5f9",
                      fontSize: "0.85rem",
                      color: "#64748b",
                      lineHeight: 1.5,
                    }}
                  >
                    {food.ingredients}
                  </Box>
                </Box>

                {/* Quantity and Add Button */}
                <Box sx={{ pt: 1 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    {/* Counter */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        bgcolor: "#f8fafc",
                        border: "1px solid #e2e8f0",
                        borderRadius: "12px",
                        p: 0.5,
                      }}
                    >
                      <IconButton
                        onClick={() => handleCount("dec")}
                        disabled={count <= 1}
                        sx={{
                          bgcolor: "#ffffff",
                          color: "#1e293b",
                          p: 1,
                          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                          "&:disabled": { opacity: 0.4 },
                        }}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>

                      <Typography
                        sx={{
                          px: 2,
                          minWidth: 36,
                          textAlign: "center",
                          fontWeight: 800,
                          fontSize: "1.1rem",
                          color: "#1e293b",
                        }}
                      >
                        {count}
                      </Typography>

                      <IconButton
                        onClick={() => handleCount("inc")}
                        sx={{
                          bgcolor: "#18BA51",
                          color: "#ffffff",
                          p: 1,
                          boxShadow: "0 2px 8px rgba(24, 186, 81, 0.3)",
                          "&:hover": { bgcolor: "#15803d" },
                        }}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Box>

                    {/* Add to Basket Button */}
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={handleAddToCart}
                      startIcon={<ShoppingBasketOutlinedIcon />}
                      sx={{
                        py: 1.6,
                        bgcolor: "#18BA51",
                        fontSize: "1rem",
                        fontWeight: 800,
                        borderRadius: "12px",
                        boxShadow: "0 8px 20px rgba(24, 186, 81, 0.3)",
                        "&:hover": { bgcolor: "#15803d" },
                      }}
                    >
                      Сагслах ({totalPrice.toLocaleString()}₮)
                    </Button>
                  </Stack>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
}
