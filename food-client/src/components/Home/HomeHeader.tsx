"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import Grid from "@mui/material/Grid";

const StateCards = [
  {
    image: <MenuBookIcon />,
    top: "Хүргэлтийн төлөв хянах",
    bottom: " Захиалга бэлтгэлийн явцыг хянах",
  },
  {
    image: <AccessTimeIcon />,
    top: "Шуурхай хүргэлт",
    bottom: "Захиалга бэлтгэлийн явцыг хянах",
  },
  {
    image: <RestaurantIcon />,
    top: "Эрүүл, баталгаат орц",
    bottom: " Захиалга бэлтгэлийн явцыг хянах",
  },
  {
    image: <MenuBookIcon />,
    top: "Хоолны өргөн сонголт",
    bottom: " Захиалга бэлтгэлийн явцыг хянах",
  },
];
export default function HomeHeader() {
  return (
    <Box
      sx={{
        width: "100%",
        my: 4,
        px: 2,
      }}
    >
      <Grid container spacing={3} justifyContent="center">
        {StateCards.map((Card, index) => (
          <Grid key={index} item xs={12} sm={6} md={3}>
            <Box
              sx={{
                p: 2,
                height: "100%",
                minHeight: 130,
                boxShadow: 3,
                borderRadius: "16px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                bgcolor: "background.paper",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                },
              }}
            >
              <Box>
                <Typography
                  variant="h5"
                  sx={{ color: "#18BA51", mb: 2 }}
                >
                  {Card.image}
                </Typography>
              </Box>

              <Box>
                <Typography fontSize={17} fontWeight={900} gutterBottom>
                  {Card.top}
                </Typography>
                <Typography fontSize={13} color="text.secondary">
                  {Card.bottom}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
