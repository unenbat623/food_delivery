"use client";

import React from "react";
import {
  Box,
  Button,
  Divider,
  Drawer,
  Typography,
  IconButton,
  Stack,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useBasket } from "@/context/BasketProvider";
import { useRouter } from "next/navigation";

interface IDrawerProps {
  open: boolean;
  handleClose: () => void;
}

const MyDrawer = ({ handleClose, open }: IDrawerProps) => {
  const router = useRouter();
  const {
    basket,
    totalPrice,
    totalCount,
    updateFoodToBasket,
    deleteFoodFromBasket,
    clearBasket,
  } = useBasket();

  const deliveryFee = totalPrice >= 40000 || totalPrice === 0 ? 0 : 4000;
  const grandTotal = totalPrice + deliveryFee;

  const handleCheckout = () => {
    handleClose();
    router.push("/order");
  };

  return (
    <Drawer
      open={open}
      onClose={handleClose}
      anchor="right"
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: 460 },
          display: "flex",
          flexDirection: "column",
          bgcolor: "#ffffff",
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #f1f5f9",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              bgcolor: "rgba(24, 186, 81, 0.12)",
              color: "#18BA51",
              p: 1,
              borderRadius: "10px",
              display: "flex",
            }}
          >
            <ShoppingBasketOutlinedIcon fontSize="small" />
          </Box>
          <Typography variant="h6" fontWeight={700} fontSize="1.15rem">
            Таны сагс ({totalCount})
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {basket.length > 0 && (
            <Button
              onClick={clearBasket}
              size="small"
              sx={{ color: "#94a3b8", fontSize: "0.75rem", "&:hover": { color: "#ef4444" } }}
            >
              Цэвэрлэх
            </Button>
          )}
          <IconButton onClick={handleClose} size="small" sx={{ color: "#64748b" }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* Body: Items List or Empty State */}
      <Box sx={{ flex: 1, overflowY: "auto", p: 2.5 }}>
        {basket.length === 0 ? (
          <Stack
            alignItems="center"
            justifyContent="center"
            spacing={2}
            sx={{ height: "100%", py: 8, textAlign: "center" }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                bgcolor: "#f8fafc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#94a3b8",
              }}
            >
              <ShoppingBasketOutlinedIcon sx={{ fontSize: 40 }} />
            </Box>
            <Typography variant="h6" fontWeight={700} color="#1e293b">
              Таны сагс хоосон байна
            </Typography>
            <Typography variant="body2" color="#64748b" sx={{ maxWidth: 260 }}>
              Манай цэснээс өөрийн дуртай амтат хоолоо сонгон захиалаарай.
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                handleClose();
                router.push("/menu");
              }}
              sx={{
                bgcolor: "#18BA51",
                color: "#fff",
                mt: 2,
                px: 3,
                py: 1,
                borderRadius: "10px",
                "&:hover": { bgcolor: "#15803d" },
              }}
            >
              Хоолны цэс үзэх
            </Button>
          </Stack>
        ) : (
          <Stack spacing={2}>
            {basket.map((item) => {
              const unitPrice =
                item.food.isSale && item.food.discountPrice
                  ? item.food.discountPrice
                  : item.food.price;
              const itemTotal = unitPrice * item.count;

              return (
                <Box
                  key={item.food._id}
                  sx={{
                    display: "flex",
                    gap: 2,
                    p: 1.5,
                    borderRadius: "14px",
                    bgcolor: "#f8fafc",
                    border: "1px solid #f1f5f9",
                    transition: "all 0.2s ease",
                    "&:hover": { bgcolor: "#f1f5f9" },
                  }}
                >
                  {/* Thumbnail */}
                  <Avatar
                    src={item.food.image}
                    alt={item.food.name}
                    variant="rounded"
                    sx={{ width: 72, height: 72, borderRadius: "10px" }}
                  />

                  {/* Info */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <Typography
                        fontWeight={700}
                        fontSize="0.95rem"
                        noWrap
                        sx={{ color: "#1e293b" }}
                      >
                        {item.food.name}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => deleteFoodFromBasket(item.food._id)}
                        sx={{ color: "#94a3b8", p: 0.5, "&:hover": { color: "#ef4444" } }}
                      >
                        <DeleteOutlineIcon fontSize="small" />
                      </IconButton>
                    </Box>

                    <Typography
                      fontSize="0.875rem"
                      fontWeight={700}
                      sx={{ color: "#18BA51", mt: 0.5 }}
                    >
                      {unitPrice.toLocaleString()}₮
                    </Typography>

                    {/* Quantity Controls */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mt: 1,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          bgcolor: "#ffffff",
                          borderRadius: "8px",
                          border: "1px solid #e2e8f0",
                          p: 0.25,
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={() => updateFoodToBasket(item.food._id, item.count - 1)}
                          sx={{ p: 0.5, color: "#64748b" }}
                        >
                          <RemoveIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                        <Typography
                          sx={{
                            px: 1.5,
                            fontSize: "0.875rem",
                            fontWeight: 700,
                            minWidth: 24,
                            textAlign: "center",
                          }}
                        >
                          {item.count}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => updateFoodToBasket(item.food._id, item.count + 1)}
                          sx={{ p: 0.5, color: "#18BA51" }}
                        >
                          <AddIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                      </Box>

                      <Typography fontSize="0.9rem" fontWeight={800} color="#1e293b">
                        {itemTotal.toLocaleString()}₮
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Stack>
        )}
      </Box>

      {/* Footer / Summary */}
      {basket.length > 0 && (
        <Box
          sx={{
            p: 2.5,
            borderTop: "1px solid #f1f5f9",
            bgcolor: "#ffffff",
          }}
        >
          <Stack spacing={1.25} sx={{ mb: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography fontSize="0.875rem" color="#64748b">
                Хоолны дүн:
              </Typography>
              <Typography fontSize="0.875rem" fontWeight={600} color="#1e293b">
                {totalPrice.toLocaleString()}₮
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography fontSize="0.875rem" color="#64748b">
                Хүргэлтийн төлбөр:
              </Typography>
              <Typography
                fontSize="0.875rem"
                fontWeight={600}
                color={deliveryFee === 0 ? "#18BA51" : "#1e293b"}
              >
                {deliveryFee === 0 ? "Үнэгүй (Урамшуулал)" : `${deliveryFee.toLocaleString()}₮`}
              </Typography>
            </Box>

            <Divider />

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pt: 0.5 }}>
              <Typography fontWeight={700} fontSize="1.05rem" color="#1e293b">
                Нийт төлөх:
              </Typography>
              <Typography fontWeight={800} fontSize="1.25rem" color="#18BA51">
                {grandTotal.toLocaleString()}₮
              </Typography>
            </Box>
          </Stack>

          <Button
            fullWidth
            variant="contained"
            onClick={handleCheckout}
            endIcon={<ArrowForwardIcon />}
            sx={{
              py: 1.5,
              bgcolor: "#18BA51",
              fontSize: "1rem",
              fontWeight: 700,
              borderRadius: "12px",
              "&:hover": { bgcolor: "#15803d" },
            }}
          >
            Захиалга үргэлжлүүлэх
          </Button>
        </Box>
      )}
    </Drawer>
  );
};

export default MyDrawer;
