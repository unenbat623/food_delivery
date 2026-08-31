"use client";

import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Stack,
  Paper,
  Chip,
  Grid,
  Button,
  Avatar,
  Divider,
} from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ReplayIcon from "@mui/icons-material/Replay";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import Link from "next/link";
import { IOrder } from "@/types/food";
import { useBasket } from "@/context/BasketProvider";
import { useRouter } from "next/navigation";

const STORAGE_KEY = "pinecone_food_order_history";

export default function OrderHistoryPage() {
  const router = useRouter();
  const { addFoodToBasket, setIsDrawerOpen } = useBasket();
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setOrders(JSON.parse(saved));
      } else {
        // Provide sample past order for illustration
        const sampleOrder: IOrder = {
          _id: "ORD-839210",
          orderNumber: "ORD-839210",
          items: [
            {
              food: {
                _id: "food_1",
                name: "Тусгай Махтай Pizza",
                price: 28500,
                discountPrice: 22800,
                isSale: true,
                description: "Итали уламжлалт аргаар зуурсан царцмагтай...",
                ingredients: "Үхрийн мах, Пепперони, Моцарелла",
                image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
              },
              count: 1,
            },
            {
              food: {
                _id: "food_16",
                name: "Шинэхэн Шахсан Жүржийн Жүүс",
                price: 8500,
                description: "100% цэвэр жүржийн жимснээс шахсан...",
                ingredients: "Шинэ жүрж 4ш, Мөс",
                image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80",
              },
              count: 2,
            },
          ],
          totalAmount: 39800,
          deliveryFee: 0,
          district: "Сүхбаатар дүүрэг",
          khoroo: "1-р хороо",
          addressDetail: "Сүхбаатар дүүрэг, 1-р хороо, 22-р байр 34 тоот",
          phone: "99112233",
          paymentMethod: "qpay",
          paymentStatus: "paid",
          orderStatus: "Хүргэгдсэн",
          createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        };
        setOrders([sampleOrder]);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleReorder = (order: IOrder) => {
    order.items.forEach((item) => {
      addFoodToBasket(item.food, item.count);
    });
    setIsDrawerOpen(true);
  };

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
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
            <HistoryIcon />
          </Box>
          <Typography variant="h4" fontWeight={900} color="#1e293b">
            Захиалгын түүх
          </Typography>
        </Stack>
        <Typography variant="body1" color="#64748b">
          Таны өмнө хийсэн бүх захиалгын явц болон дэлгэрэнгүй жагсаалт.
        </Typography>
      </Box>

      {orders.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            py: 10,
            px: 4,
            textAlign: "center",
            borderRadius: "20px",
            border: "1px solid #f1f5f9",
            bgcolor: "#ffffff",
          }}
        >
          <ShoppingBagOutlinedIcon sx={{ fontSize: 48, color: "#94a3b8", mb: 2 }} />
          <Typography variant="h6" fontWeight={700} color="#1e293b" gutterBottom>
            Танд одоогоор захиалгын түүх байхгүй байна
          </Typography>
          <Typography variant="body2" color="#64748b" sx={{ mb: 3 }}>
            Та манай амтат цэснээс хүссэн хоолоо сонгон захиалгаа өгнө үү.
          </Typography>
          <Link href="/menu" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#18BA51",
                px: 3,
                py: 1.2,
                borderRadius: "10px",
                fontWeight: 700,
                "&:hover": { bgcolor: "#15803d" },
              }}
            >
              Хоол захиалах
            </Button>
          </Link>
        </Paper>
      ) : (
        <Stack spacing={3}>
          {orders.map((order) => {
            const isCompleted = order.orderStatus === "Хүргэгдсэн";
            return (
              <Paper
                key={order._id}
                elevation={0}
                sx={{
                  p: { xs: 2.5, md: 3.5 },
                  borderRadius: "20px",
                  border: "1px solid #f1f5f9",
                  bgcolor: "#ffffff",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                }}
              >
                {/* Header info */}
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                    pb: 2,
                    borderBottom: "1px solid #f1f5f9",
                  }}
                >
                  <Box>
                    <Typography fontWeight={800} fontSize="1.1rem" color="#1e293b">
                      Захиалга: #{order.orderNumber || order._id}
                    </Typography>
                    <Typography fontSize="0.85rem" color="#64748b">
                      Огноо: {new Date(order.createdAt).toLocaleDateString("mn-MN")} {new Date(order.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </Typography>
                  </Box>

                  <Chip
                    icon={isCompleted ? <CheckCircleIcon sx={{ fontSize: "16px !important", color: "#18BA51 !important" }} /> : <AccessTimeIcon sx={{ fontSize: "16px !important", color: "#f59e0b !important" }} />}
                    label={order.orderStatus}
                    sx={{
                      bgcolor: isCompleted ? "rgba(24, 186, 81, 0.1)" : "rgba(245, 158, 11, 0.1)",
                      color: isCompleted ? "#18BA51" : "#f59e0b",
                      fontWeight: 800,
                      borderRadius: "8px",
                      px: 1,
                    }}
                  />
                </Box>

                {/* Items List */}
                <Grid container spacing={3} sx={{ my: 1 }}>
                  <Grid item xs={12} md={8}>
                    <Stack spacing={1.5}>
                      {order.items.map((item, idx) => {
                        const price = item.food.isSale && item.food.discountPrice ? item.food.discountPrice : item.food.price;
                        return (
                          <Box
                            key={idx}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                              <Avatar
                                src={item.food.image}
                                alt={item.food.name}
                                variant="rounded"
                                sx={{ width: 44, height: 44, borderRadius: "8px" }}
                              />
                              <Box>
                                <Typography fontWeight={600} fontSize="0.9rem" color="#1e293b">
                                  {item.food.name}
                                </Typography>
                                <Typography fontSize="0.8rem" color="#64748b">
                                  {price.toLocaleString()}₮ × {item.count}
                                </Typography>
                              </Box>
                            </Box>

                            <Typography fontWeight={700} fontSize="0.9rem" color="#1e293b">
                              {(price * item.count).toLocaleString()}₮
                            </Typography>
                          </Box>
                        );
                      })}
                    </Stack>
                  </Grid>

                  {/* Summary & Address */}
                  <Grid item xs={12} md={4}>
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: "#f8fafc",
                        borderRadius: "14px",
                        border: "1px solid #f1f5f9",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box>
                        <Typography fontSize="0.8rem" color="#64748b" gutterBottom>
                          Хүргэлтийн хаяг:
                        </Typography>
                        <Typography fontSize="0.875rem" fontWeight={600} color="#1e293b" sx={{ mb: 1 }}>
                          {order.addressDetail}
                        </Typography>
                        <Typography fontSize="0.8rem" color="#64748b">
                          Утас: <b>{order.phone}</b>
                        </Typography>
                      </Box>

                      <Box sx={{ pt: 2, borderTop: "1px solid #e2e8f0", mt: 2 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <Typography fontSize="0.9rem" color="#64748b">
                            Нийт төлсөн:
                          </Typography>
                          <Typography fontSize="1.15rem" fontWeight={900} color="#18BA51">
                            {order.totalAmount.toLocaleString()}₮
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>

                {/* Footer Action */}
                <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 2, borderTop: "1px solid #f1f5f9" }}>
                  <Button
                    variant="outlined"
                    onClick={() => handleReorder(order)}
                    startIcon={<ReplayIcon />}
                    sx={{
                      color: "#18BA51",
                      borderColor: "#18BA51",
                      borderRadius: "10px",
                      fontWeight: 700,
                      "&:hover": { bgcolor: "rgba(24, 186, 81, 0.08)", borderColor: "#15803d" },
                    }}
                  >
                    Дахин захиалах
                  </Button>
                </Box>
              </Paper>
            );
          })}
        </Stack>
      )}
    </Container>
  );
}
