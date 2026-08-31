"use client";

import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Stack,
  TextField,
  MenuItem,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Divider,
  Avatar,
  Paper,
  Dialog,
  DialogContent,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PaymentIcon from "@mui/icons-material/Payment";
import PhoneIcon from "@mui/icons-material/Phone";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useBasket } from "@/context/BasketProvider";
import { useUser } from "@/context/UserProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IOrder } from "@/types/food";
import { toast } from "react-toastify";

const DISTRICT_OPTIONS = [
  "Сүхбаатар дүүрэг",
  "Баянзүрх дүүрэг",
  "Хан-Уул дүүрэг",
  "Чингэлтэй дүүрэг",
  "Баянгол дүүрэг",
  "Сонгинохайрхан дүүрэг",
];

export default function OrderPage() {
  const router = useRouter();
  const { basket, totalPrice, clearBasket } = useBasket();
  const { user } = useUser();

  const [district, setDistrict] = useState<string>("Сүхбаатар дүүрэг");
  const [khoroo, setKhoroo] = useState<string>("1-р хороо");
  const [street, setStreet] = useState<string>("");
  const [detail, setDetail] = useState<string>("");
  const [phone, setPhone] = useState<string>(user?.phone || "99112233");
  const [paymentMethod, setPaymentMethod] = useState<"qpay" | "card" | "cash">("qpay");
  const [notes, setNotes] = useState<string>("");

  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<IOrder | null>(null);

  const deliveryFee = totalPrice >= 40000 || totalPrice === 0 ? 0 : 4000;
  const grandTotal = totalPrice + deliveryFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!street.trim()) {
      toast.warning("Байр, гудамжны хаягаа оруулна уу.");
      return;
    }
    if (!phone.trim()) {
      toast.warning("Холбоо барих утасны дугаараа оруулна уу.");
      return;
    }

    const newOrder: IOrder = {
      _id: "ORD-" + Math.floor(100000 + Math.random() * 900000),
      orderNumber: "ORD-" + Math.floor(100000 + Math.random() * 900000),
      items: [...basket],
      totalAmount: grandTotal,
      deliveryFee,
      district,
      khoroo,
      addressDetail: `${district}, ${khoroo}, ${street}${detail ? ` (${detail})` : ""}`,
      phone,
      paymentMethod,
      paymentStatus: paymentMethod === "cash" ? "pending" : "paid",
      orderStatus: "Бэлтгэгдэж буй",
      createdAt: new Date().toISOString(),
      notes,
    };

    // Save order to localStorage history
    try {
      const historyKey = "pinecone_food_order_history";
      const existing = JSON.parse(localStorage.getItem(historyKey) || "[]");
      localStorage.setItem(historyKey, JSON.stringify([newOrder, ...existing]));
    } catch (err) {
      console.error("Order save error", err);
    }

    setCompletedOrder(newOrder);
    clearBasket();
    setIsSuccessOpen(true);
  };

  if (basket.length === 0 && !isSuccessOpen) {
    return (
      <Container maxWidth="md" sx={{ py: 12, textAlign: "center" }}>
        <Paper
          elevation={0}
          sx={{
            p: 6,
            borderRadius: "24px",
            border: "1px solid #f1f5f9",
            bgcolor: "#ffffff",
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              bgcolor: "rgba(24, 186, 81, 0.1)",
              color: "#18BA51",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 3,
            }}
          >
            <ShoppingBagIcon sx={{ fontSize: 40 }} />
          </Box>
          <Typography variant="h5" fontWeight={800} color="#1e293b" gutterBottom>
            Таны сагс одоогоор хоосон байна
          </Typography>
          <Typography variant="body1" color="#64748b" sx={{ mb: 4, maxWidth: 440, mx: "auto" }}>
            Захиалга хийхийн тулд эхлээд манай амтат цэснээс сонголтоо хийнэ үү.
          </Typography>
          <Link href="/menu" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: "#18BA51",
                px: 4,
                py: 1.5,
                borderRadius: "12px",
                fontWeight: 700,
                "&:hover": { bgcolor: "#15803d" },
              }}
            >
              Хоолны цэс үзэх
            </Button>
          </Link>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
      <Box sx={{ mb: 4 }}>
        <Link href="/menu" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, color: "#64748b" }}>
          <ArrowBackIcon fontSize="small" />
          <Typography fontSize="0.9rem" fontWeight={600}>
            Цэс рүү буцах
          </Typography>
        </Link>
        <Typography variant="h4" fontWeight={900} color="#1e293b" sx={{ mt: 1 }}>
          Захиалга баталгаажуулах
        </Typography>
      </Box>

      <form onSubmit={handleSubmitOrder}>
        <Grid container spacing={4}>
          {/* Left: Address & Payment inputs */}
          <Grid item xs={12} lg={7}>
            <Stack spacing={4}>
              {/* Address Box */}
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2.5, md: 3.5 },
                  borderRadius: "20px",
                  border: "1px solid #f1f5f9",
                  bgcolor: "#ffffff",
                }}
              >
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 3 }}>
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
                    <LocationOnIcon fontSize="small" />
                  </Box>
                  <Typography variant="h6" fontWeight={800} color="#1e293b">
                    1. Хүргэлтийн хаяг
                  </Typography>
                </Stack>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      fullWidth
                      label="Дүүрэг"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      size="small"
                      required
                    >
                      {DISTRICT_OPTIONS.map((d) => (
                        <MenuItem key={d} value={d}>
                          {d}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Хороо"
                      value={khoroo}
                      onChange={(e) => setKhoroo(e.target.value)}
                      size="small"
                      placeholder="Жишээ: 1-р хороо"
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Байр, гудамжны нэр, дугаар"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      size="small"
                      placeholder="Жишээ: 12-р байр, 45 тоот"
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Нэмэлт тайлбар (Орцны код, давхар г.м)"
                      value={detail}
                      onChange={(e) => setDetail(e.target.value)}
                      size="small"
                      placeholder="Жишээ: 2-р орц, 5 давхар, код: 1234"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Холбоо барих утас"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      size="small"
                      required
                      InputProps={{
                        startAdornment: <PhoneIcon fontSize="small" sx={{ color: "#94a3b8", mr: 1 }} />,
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={2}
                      label="Тогоочид өгөх санамж (Сонгиногүй, халуун ногоогүй г.м)"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      size="small"
                    />
                  </Grid>
                </Grid>
              </Paper>

              {/* Payment Box */}
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2.5, md: 3.5 },
                  borderRadius: "20px",
                  border: "1px solid #f1f5f9",
                  bgcolor: "#ffffff",
                }}
              >
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 3 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "10px",
                      bgcolor: "rgba(245, 158, 11, 0.12)",
                      color: "#f59e0b",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <PaymentIcon fontSize="small" />
                  </Box>
                  <Typography variant="h6" fontWeight={800} color="#1e293b">
                    2. Төлбөрийн нөхцөл
                  </Typography>
                </Stack>

                <FormControl component="fieldset" fullWidth>
                  <RadioGroup
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        mb: 1.5,
                        borderRadius: "12px",
                        border: paymentMethod === "qpay" ? "2px solid #18BA51" : "1px solid #e2e8f0",
                        bgcolor: paymentMethod === "qpay" ? "rgba(24, 186, 81, 0.04)" : "#ffffff",
                        cursor: "pointer",
                      }}
                      onClick={() => setPaymentMethod("qpay")}
                    >
                      <FormControlLabel
                        value="qpay"
                        control={<Radio sx={{ color: "#18BA51", "&.Mui-checked": { color: "#18BA51" } }} />}
                        label={
                          <Box>
                            <Typography fontWeight={700} fontSize="0.95rem" color="#1e293b">
                              QPay (Бүх банкны апп)
                            </Typography>
                            <Typography fontSize="0.8rem" color="#64748b">
                              Хаан, Голомт, Хас, М банк, TDB зэрэг 14+ банкны аппликейшнаар шууд төлөх
                            </Typography>
                          </Box>
                        }
                      />
                    </Paper>

                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        mb: 1.5,
                        borderRadius: "12px",
                        border: paymentMethod === "card" ? "2px solid #18BA51" : "1px solid #e2e8f0",
                        bgcolor: paymentMethod === "card" ? "rgba(24, 186, 81, 0.04)" : "#ffffff",
                        cursor: "pointer",
                      }}
                      onClick={() => setPaymentMethod("card")}
                    >
                      <FormControlLabel
                        value="card"
                        control={<Radio sx={{ color: "#18BA51", "&.Mui-checked": { color: "#18BA51" } }} />}
                        label={
                          <Box>
                            <Typography fontWeight={700} fontSize="0.95rem" color="#1e293b">
                              Банкны карт (Visa / MasterCard)
                            </Typography>
                            <Typography fontSize="0.8rem" color="#64748b">
                              Онлайн картын гүйлгээ
                            </Typography>
                          </Box>
                        }
                      />
                    </Paper>

                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: "12px",
                        border: paymentMethod === "cash" ? "2px solid #18BA51" : "1px solid #e2e8f0",
                        bgcolor: paymentMethod === "cash" ? "rgba(24, 186, 81, 0.04)" : "#ffffff",
                        cursor: "pointer",
                      }}
                      onClick={() => setPaymentMethod("cash")}
                    >
                      <FormControlLabel
                        value="cash"
                        control={<Radio sx={{ color: "#18BA51", "&.Mui-checked": { color: "#18BA51" } }} />}
                        label={
                          <Box>
                            <Typography fontWeight={700} fontSize="0.95rem" color="#1e293b">
                              Бэлнээр төлөх
                            </Typography>
                            <Typography fontSize="0.8rem" color="#64748b">
                              Хүргэлтийн ажилтанд бэлнээр өгөх
                            </Typography>
                          </Box>
                        }
                      />
                    </Paper>
                  </RadioGroup>
                </FormControl>
              </Paper>
            </Stack>
          </Grid>

          {/* Right: Order Summary & Placement */}
          <Grid item xs={12} lg={5}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, md: 3.5 },
                borderRadius: "20px",
                border: "1px solid #f1f5f9",
                bgcolor: "#ffffff",
                position: { lg: "sticky" },
                top: { lg: 96 },
              }}
            >
              <Typography variant="h6" fontWeight={800} color="#1e293b" sx={{ mb: 2.5 }}>
                Захиалгын хураангуй ({basket.length} төрөл)
              </Typography>

              {/* Items List */}
              <Stack spacing={2} sx={{ mb: 3, maxHeight: 320, overflowY: "auto", pr: 1 }}>
                {basket.map((item) => {
                  const unitPrice =
                    item.food.isSale && item.food.discountPrice
                      ? item.food.discountPrice
                      : item.food.price;
                  return (
                    <Box
                      key={item.food._id}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 2,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, minWidth: 0 }}>
                        <Avatar
                          src={item.food.image}
                          alt={item.food.name}
                          variant="rounded"
                          sx={{ width: 48, height: 48, borderRadius: "10px" }}
                        />
                        <Box sx={{ minWidth: 0 }}>
                          <Typography fontWeight={700} fontSize="0.9rem" noWrap>
                            {item.food.name}
                          </Typography>
                          <Typography fontSize="0.8rem" color="#64748b">
                            {unitPrice.toLocaleString()}₮ × {item.count}
                          </Typography>
                        </Box>
                      </Box>

                      <Typography fontWeight={800} fontSize="0.95rem" color="#1e293b">
                        {(unitPrice * item.count).toLocaleString()}₮
                      </Typography>
                    </Box>
                  );
                })}
              </Stack>

              <Divider sx={{ my: 2 }} />

              {/* Price Breakdown */}
              <Stack spacing={1.5} sx={{ mb: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography fontSize="0.9rem" color="#64748b">
                    Хоолны нийт дүн:
                  </Typography>
                  <Typography fontSize="0.9rem" fontWeight={600} color="#1e293b">
                    {totalPrice.toLocaleString()}₮
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography fontSize="0.9rem" color="#64748b">
                    Хүргэлтийн төлбөр:
                  </Typography>
                  <Typography
                    fontSize="0.9rem"
                    fontWeight={600}
                    color={deliveryFee === 0 ? "#18BA51" : "#1e293b"}
                  >
                    {deliveryFee === 0 ? "Үнэгүй (Урамшуулал)" : `${deliveryFee.toLocaleString()}₮`}
                  </Typography>
                </Box>

                <Divider />

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography fontWeight={800} fontSize="1.1rem" color="#1e293b">
                    Төлөх дүн:
                  </Typography>
                  <Typography fontWeight={900} fontSize="1.4rem" color="#18BA51">
                    {grandTotal.toLocaleString()}₮
                  </Typography>
                </Box>
              </Stack>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  bgcolor: "#18BA51",
                  py: 1.6,
                  fontSize: "1.05rem",
                  fontWeight: 800,
                  borderRadius: "14px",
                  boxShadow: "0 8px 25px rgba(24, 186, 81, 0.35)",
                  "&:hover": { bgcolor: "#15803d" },
                }}
              >
                Захиалга баталгаажуулах
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </form>

      {/* Success Confirmation Modal */}
      <Dialog
        open={isSuccessOpen}
        onClose={() => {}}
        PaperProps={{
          sx: {
            borderRadius: "24px",
            p: { xs: 3, sm: 4 },
            maxWidth: 480,
            textAlign: "center",
          },
        }}
      >
        <DialogContent sx={{ p: 0 }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              bgcolor: "rgba(24, 186, 81, 0.12)",
              color: "#18BA51",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 3,
            }}
          >
            <CheckCircleOutlineIcon sx={{ fontSize: 50 }} />
          </Box>

          <Typography variant="h5" fontWeight={900} color="#1e293b" gutterBottom>
            Захиалга амжилттай баталгаажлаа! 🎉
          </Typography>

          <Typography variant="body2" color="#64748b" sx={{ mb: 3 }}>
            Таны захиалгын дугаар: <b>{completedOrder?.orderNumber}</b>. Гал тогоонд бэлтгэгдэж эхэллээ.
          </Typography>

          <Box
            sx={{
              p: 2.5,
              bgcolor: "#f8fafc",
              borderRadius: "14px",
              border: "1px solid #f1f5f9",
              textAlign: "left",
              mb: 3,
            }}
          >
            <Typography fontSize="0.85rem" color="#64748b" gutterBottom>
              Хүргэгдэх хаяг:
            </Typography>
            <Typography fontSize="0.9rem" fontWeight={700} color="#1e293b" sx={{ mb: 1 }}>
              {completedOrder?.addressDetail}
            </Typography>
            <Typography fontSize="0.85rem" color="#64748b">
              Төлсөн дүн: <b>{completedOrder?.totalAmount.toLocaleString()}₮</b> ({completedOrder?.paymentMethod.toUpperCase()})
            </Typography>
          </Box>

          <Stack spacing={1.5}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                setIsSuccessOpen(false);
                router.push("/order/orderHistory");
              }}
              sx={{
                bgcolor: "#18BA51",
                py: 1.4,
                fontWeight: 700,
                borderRadius: "12px",
                "&:hover": { bgcolor: "#15803d" },
              }}
            >
              Захиалгын түүх харах
            </Button>

            <Button
              variant="outlined"
              fullWidth
              onClick={() => {
                setIsSuccessOpen(false);
                router.push("/");
              }}
              sx={{
                borderColor: "#e2e8f0",
                color: "#64748b",
                py: 1.2,
                borderRadius: "12px",
                "&:hover": { borderColor: "#cbd5e1", bgcolor: "#f8fafc" },
              }}
            >
              Нүүр хуудас руу очих
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </Container>
  );
}
