"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";

const StateCards = [
  {
    icon: <TrackChangesIcon sx={{ fontSize: 32 }} />,
    title: "Хүргэлтийн төлөв хянах",
    description: "Захиалга бэлтгэл болон хүргэлтийн явцыг шууд хянах",
  },
  {
    icon: <AccessTimeIcon sx={{ fontSize: 32 }} />,
    title: "Шуурхай хүргэлт",
    description: "30 минутын дотор халуунаар нь таны гарт хүргэнэ",
  },
  {
    icon: <RestaurantIcon sx={{ fontSize: 32 }} />,
    title: "Эрүүл, баталгаат орц",
    description: "Өдөр бүрийн шинэхэн, чанарын шаардлага хангасан орц",
  },
  {
    icon: <MenuBookIcon sx={{ fontSize: 32 }} />,
    title: "Хоолны өргөн сонголт",
    description: "Шилдэг тогооч нарын бэлтгэсэн 50+ төрлийн амтат зоог",
  },
];

export default function HomeHeader() {
  return (
    <Container maxWidth="xl" sx={{ mb: 6 }}>
      <Grid container spacing={3}>
        {StateCards.map((card, index) => (
          <Grid key={index} item xs={12} sm={6} md={3}>
            <Box
              sx={{
                p: 3,
                height: "100%",
                borderRadius: "16px",
                bgcolor: "#ffffff",
                border: "1px solid #f1f5f9",
                boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
                transition: "all 0.25s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 12px 30px rgba(24, 186, 81, 0.12)",
                  borderColor: "rgba(24, 186, 81, 0.3)",
                },
              }}
            >
              <Box
                sx={{
                  width: 54,
                  height: 54,
                  borderRadius: "12px",
                  bgcolor: "rgba(24, 186, 81, 0.1)",
                  color: "#18BA51",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {card.icon}
              </Box>

              <Typography fontSize={17} fontWeight={700} color="#1e293b">
                {card.title}
              </Typography>

              <Typography fontSize={13.5} color="#64748b" lineHeight={1.5}>
                {card.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
