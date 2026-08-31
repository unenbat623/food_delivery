"use client";

import React from "react";
import { Container, Typography, Box, Stack, Grid, Paper, TextField, Button } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SendIcon from "@mui/icons-material/Send";
import { toast } from "react-toastify";

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Таны зурвас амжилттай илгээгдлээ. Бид тун удахгүй холбогдох болно! ✉️");
  };

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 4, md: 8 } }}>
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography variant="h3" fontWeight={900} color="#1e293b" gutterBottom>
          Холбоо барих
        </Typography>
        <Typography variant="body1" color="#64748b" sx={{ maxWidth: 600, mx: "auto" }}>
          Танд асуух зүйл, санал хүсэлт, хамтран ажиллах хүсэлт байвал бидэнтэй холбогдоорой.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Contact info cards */}
        <Grid item xs={12} md={5}>
          <Stack spacing={3}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: "16px",
                border: "1px solid #f1f5f9",
                bgcolor: "#ffffff",
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "12px",
                  bgcolor: "rgba(24, 186, 81, 0.12)",
                  color: "#18BA51",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PhoneIcon />
              </Box>
              <Box>
                <Typography fontWeight={700} fontSize="1rem" color="#1e293b">
                  Утас
                </Typography>
                <Typography fontSize="0.9rem" color="#64748b">
                  7711-8899, 9911-2233
                </Typography>
              </Box>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: "16px",
                border: "1px solid #f1f5f9",
                bgcolor: "#ffffff",
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "12px",
                  bgcolor: "rgba(24, 186, 81, 0.12)",
                  color: "#18BA51",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <EmailIcon />
              </Box>
              <Box>
                <Typography fontWeight={700} fontSize="1rem" color="#1e293b">
                  Имэйл
                </Typography>
                <Typography fontSize="0.9rem" color="#64748b">
                  info@fooddelivery.mn
                </Typography>
              </Box>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: "16px",
                border: "1px solid #f1f5f9",
                bgcolor: "#ffffff",
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "12px",
                  bgcolor: "rgba(24, 186, 81, 0.12)",
                  color: "#18BA51",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <LocationOnIcon />
              </Box>
              <Box>
                <Typography fontWeight={700} fontSize="1rem" color="#1e293b">
                  Хаяг
                </Typography>
                <Typography fontSize="0.9rem" color="#64748b">
                  Улаанбаатар хот, Сүхбаатар дүүрэг, 1-р хороо, Pinecone Tower 8F
                </Typography>
              </Box>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: "16px",
                border: "1px solid #f1f5f9",
                bgcolor: "#ffffff",
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "12px",
                  bgcolor: "rgba(24, 186, 81, 0.12)",
                  color: "#18BA51",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AccessTimeIcon />
              </Box>
              <Box>
                <Typography fontWeight={700} fontSize="1rem" color="#1e293b">
                  Цагийн хуваарь
                </Typography>
                <Typography fontSize="0.9rem" color="#64748b">
                  Өдөр бүр: 09:00 - 23:00
                </Typography>
              </Box>
            </Paper>
          </Stack>
        </Grid>

        {/* Message form */}
        <Grid item xs={12} md={7}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, sm: 4 },
              borderRadius: "20px",
              border: "1px solid #f1f5f9",
              bgcolor: "#ffffff",
            }}
          >
            <Typography variant="h6" fontWeight={800} color="#1e293b" sx={{ mb: 3 }}>
              Санал хүсэлт илгээх
            </Typography>

            <form onSubmit={handleSubmit}>
              <Stack spacing={2.5}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Таны нэр" required size="small" placeholder="Бат-Эрдэнэ" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Утасны дугаар" required size="small" placeholder="99112233" />
                  </Grid>
                </Grid>

                <TextField fullWidth label="Имэйл хаяг" type="email" required size="small" placeholder="example@gmail.com" />

                <TextField fullWidth label="Гарчиг" size="small" placeholder="Санал хүсэлтийн гарчиг..." />

                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Зурвасын агуулга"
                  required
                  size="small"
                  placeholder="Таны санал хүсэлт бидний үйлчилгээг сайжруулахад тусална..."
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  endIcon={<SendIcon />}
                  sx={{
                    bgcolor: "#18BA51",
                    py: 1.4,
                    borderRadius: "12px",
                    fontWeight: 700,
                    alignSelf: "flex-start",
                    px: 4,
                    "&:hover": { bgcolor: "#15803d" },
                  }}
                >
                  Илгээх
                </Button>
              </Stack>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
