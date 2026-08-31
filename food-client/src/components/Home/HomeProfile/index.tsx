"use client";

import React from "react";
import { Container, Stack, Typography, Box, Button, Grid, Chip } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarIcon from "@mui/icons-material/Star";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import Link from "next/link";

const HomeProfile = () => {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#18BA51",
        backgroundImage: "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15) 0%, transparent 40%), radial-gradient(circle at 10% 80%, rgba(0,0,0,0.1) 0%, transparent 40%)",
        color: "#ffffff",
        position: "relative",
        overflow: "hidden",
        py: { xs: 6, md: 10 },
        mb: 6,
      }}
    >
      {/* Decorative background shape */}
      <Box
        sx={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: "50%",
          bgcolor: "rgba(255,255,255,0.06)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
          {/* Left Column: Headline, Description, CTAs, Highlights */}
          <Grid item xs={12} md={7}>
            <Stack spacing={3}>
              <Box>
                <Chip
                  icon={<DeliveryDiningIcon style={{ color: "#fff" }} />}
                  label="Улаанбаатар хотын шилдэг хүргэлт"
                  sx={{
                    bgcolor: "rgba(255,255,255,0.2)",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    backdropFilter: "blur(4px)",
                    mb: 2,
                  }}
                />
                <Typography
                  component="h1"
                  sx={{
                    fontSize: { xs: "2.25rem", sm: "3rem", md: "3.75rem" },
                    fontWeight: 900,
                    lineHeight: 1.1,
                    letterSpacing: "-1px",
                    textShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  }}
                >
                  Pinecone <br />
                  <span style={{ color: "#fef08a" }}>Food Delivery</span>
                </Typography>
              </Box>

              <Typography
                sx={{
                  fontSize: { xs: "1rem", sm: "1.15rem", md: "1.25rem" },
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,0.9)",
                  maxWidth: 540,
                }}
              >
                Шилдэг тогооч нарын бэлтгэсэн амтат зоог, шинэхэн салат, өег үндсэн хоолыг 30 минутын дотор халуунаар нь таны үүдэнд хүргэнэ.
              </Typography>

              {/* Action Buttons */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ pt: 1 }}>
                <Link href="/menu" style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      bgcolor: "#ffffff",
                      color: "#18BA51",
                      px: 4,
                      py: 1.5,
                      fontSize: "1.05rem",
                      fontWeight: 800,
                      borderRadius: "14px",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                      "&:hover": {
                        bgcolor: "#f8fafc",
                        transform: "translateY(-2px)",
                        boxShadow: "0 14px 30px rgba(0,0,0,0.2)",
                      },
                    }}
                  >
                    Хоол захиалах
                  </Button>
                </Link>

                <Link href="/menu?category=cat_sale" style={{ textDecoration: "none" }}>
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<LocalOfferOutlinedIcon />}
                    sx={{
                      borderColor: "rgba(255,255,255,0.7)",
                      color: "#ffffff",
                      borderWidth: 2,
                      px: 3,
                      py: 1.5,
                      fontSize: "1rem",
                      fontWeight: 700,
                      borderRadius: "14px",
                      "&:hover": {
                        borderColor: "#ffffff",
                        bgcolor: "rgba(255,255,255,0.1)",
                        borderWidth: 2,
                      },
                    }}
                  >
                    Онцгой хямдрал
                  </Button>
                </Link>
              </Stack>

              {/* Quick Perks */}
              <Stack
                direction="row"
                spacing={{ xs: 2, sm: 4 }}
                sx={{
                  pt: 2,
                  borderTop: "1px solid rgba(255,255,255,0.2)",
                  flexWrap: "wrap",
                  gap: { xs: 1, sm: 0 },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <AccessTimeIcon sx={{ color: "#fef08a", fontSize: 20 }} />
                  <Typography fontSize="0.9rem" fontWeight={600}>
                    30 мин шуурхай
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <StarIcon sx={{ color: "#fef08a", fontSize: 20 }} />
                  <Typography fontSize="0.9rem" fontWeight={600}>
                    4.9+ Сэтгэл ханамж
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <DeliveryDiningIcon sx={{ color: "#fef08a", fontSize: 20 }} />
                  <Typography fontSize="0.9rem" fontWeight={600}>
                    40к+ Хүргэлт үнэгүй
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Grid>

          {/* Right Column: Hero Visual Food Showcase */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* Glow background behind image */}
              <Box
                sx={{
                  position: "absolute",
                  width: { xs: 260, sm: 340, md: 380 },
                  height: { xs: 260, sm: 340, md: 380 },
                  borderRadius: "50%",
                  bgcolor: "rgba(255, 255, 255, 0.2)",
                  filter: "blur(20px)",
                }}
              />

              {/* Main Dish Image */}
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
                alt="Delicious Bowl"
                sx={{
                  width: { xs: 260, sm: 320, md: 380 },
                  height: { xs: 260, sm: 320, md: 380 },
                  objectFit: "cover",
                  borderRadius: "50%",
                  border: "8px solid rgba(255,255,255,0.3)",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
                  position: "relative",
                  zIndex: 2,
                  animation: "float 6s ease-in-out infinite",
                  "@keyframes float": {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-12px)" },
                  },
                }}
              />

              {/* Floating Mini Badge 1 */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 20,
                  left: { xs: 0, sm: -20 },
                  bgcolor: "#ffffff",
                  color: "#1e293b",
                  p: 1.5,
                  borderRadius: "14px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  zIndex: 3,
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "10px",
                    bgcolor: "rgba(24, 186, 81, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#18BA51",
                  }}
                >
                  🍕
                </Box>
                <Box>
                  <Typography fontSize="0.75rem" color="#64748b">
                    Онцлох санал
                  </Typography>
                  <Typography fontSize="0.875rem" fontWeight={800} color="#18BA51">
                    20% Хямдрал
                  </Typography>
                </Box>
              </Box>

              {/* Floating Mini Badge 2 */}
              <Box
                sx={{
                  position: "absolute",
                  top: 20,
                  right: { xs: 0, sm: -20 },
                  bgcolor: "#ffffff",
                  color: "#1e293b",
                  p: 1.5,
                  borderRadius: "14px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  zIndex: 3,
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "10px",
                    bgcolor: "rgba(245, 158, 11, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#f59e0b",
                  }}
                >
                  ⚡
                </Box>
                <Box>
                  <Typography fontSize="0.75rem" color="#64748b">
                    Шуурхай хүргэлт
                  </Typography>
                  <Typography fontSize="0.875rem" fontWeight={800} color="#1e293b">
                    30 минутанд
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomeProfile;
