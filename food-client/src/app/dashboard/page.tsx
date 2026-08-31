"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Stack,
  Paper,
  Chip,
  Button,
} from "@mui/material";
import { useUser } from "@/context/UserProvider";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Link from "next/link";
import { IOrder } from "@/types/food";

export default function UserDashboard() {
  const { user } = useUser();
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("pinecone_food_order_history");
      if (saved) {
        setOrders(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const totalSpent = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={900} color="#1e293b" gutterBottom>
          Тавтай морил, {user?.name || "Хэрэглэгч"}! 👋
        </Typography>
        <Typography variant="body1" color="#64748b">
          Хувийн мэдээлэл, сүүлийн үеийн захиалгууд болон захиалгын тойм.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: "18px",
              border: "1px solid #f1f5f9",
              bgcolor: "#ffffff",
              display: "flex",
              alignItems: "center",
              gap: 2.5,
            }}
          >
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: "14px",
                bgcolor: "rgba(24, 186, 81, 0.12)",
                color: "#18BA51",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ShoppingBagIcon sx={{ fontSize: 30 }} />
            </Box>
            <Box>
              <Typography fontSize="0.85rem" color="#64748b">
                Нийт захиалга
              </Typography>
              <Typography variant="h5" fontWeight={900} color="#1e293b">
                {orders.length} удаа
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: "18px",
              border: "1px solid #f1f5f9",
              bgcolor: "#ffffff",
              display: "flex",
              alignItems: "center",
              gap: 2.5,
            }}
          >
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: "14px",
                bgcolor: "rgba(245, 158, 11, 0.12)",
                color: "#f59e0b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FavoriteIcon sx={{ fontSize: 30 }} />
            </Box>
            <Box>
              <Typography fontSize="0.85rem" color="#64748b">
                Нийт зарцуулалт
              </Typography>
              <Typography variant="h5" fontWeight={900} color="#1e293b">
                {totalSpent.toLocaleString()}₮
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: "18px",
              border: "1px solid #f1f5f9",
              bgcolor: "#ffffff",
              display: "flex",
              alignItems: "center",
              gap: 2.5,
            }}
          >
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: "14px",
                bgcolor: "rgba(59, 130, 246, 0.12)",
                color: "#3b82f6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PersonIcon sx={{ fontSize: 30 }} />
            </Box>
            <Box>
              <Typography fontSize="0.85rem" color="#64748b">
                Хэрэглэгчийн статус
              </Typography>
              <Typography variant="h6" fontWeight={800} color="#1e293b">
                Идэвхтэй гишүүн
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Orders */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h5" fontWeight={800} color="#1e293b">
            Сүүлийн захиалгууд
          </Typography>
          <Link href="/order/orderHistory" style={{ color: "#18BA51", fontWeight: 700, fontSize: "0.9rem" }}>
            Бүх түүх харах →
          </Link>
        </Box>

        {orders.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              p: 6,
              borderRadius: "18px",
              border: "1px solid #f1f5f9",
              bgcolor: "#ffffff",
              textAlign: "center",
            }}
          >
            <Typography variant="body1" color="#64748b" sx={{ mb: 2 }}>
              Одоогоор ямар нэгэн захиалга хийгдээгүй байна.
            </Typography>
            <Link href="/menu" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#18BA51",
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
          <Stack spacing={2}>
            {orders.slice(0, 3).map((order) => {
              const isCompleted = order.orderStatus === "Хүргэгдсэн";
              return (
                <Paper
                  key={order._id}
                  elevation={0}
                  sx={{
                    p: 2.5,
                    borderRadius: "16px",
                    border: "1px solid #f1f5f9",
                    bgcolor: "#ffffff",
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                  }}
                >
                  <Box>
                    <Typography fontWeight={800} color="#1e293b">
                      #{order.orderNumber || order._id}
                    </Typography>
                    <Typography fontSize="0.85rem" color="#64748b">
                      {order.items.map((i) => i.food.name).join(", ")}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <Typography fontWeight={800} color="#18BA51">
                      {order.totalAmount.toLocaleString()}₮
                    </Typography>

                    <Chip
                      icon={isCompleted ? <CheckCircleIcon sx={{ fontSize: "14px !important", color: "#18BA51 !important" }} /> : <AccessTimeIcon sx={{ fontSize: "14px !important", color: "#f59e0b !important" }} />}
                      label={order.orderStatus}
                      size="small"
                      sx={{
                        bgcolor: isCompleted ? "rgba(24, 186, 81, 0.1)" : "rgba(245, 158, 11, 0.1)",
                        color: isCompleted ? "#18BA51" : "#f59e0b",
                        fontWeight: 700,
                      }}
                    />
                  </Box>
                </Paper>
              );
            })}
          </Stack>
        )}
      </Box>
    </Container>
  );
}
