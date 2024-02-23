"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RestaurantIcon from "@mui/icons-material/Restaurant";

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
        display: "flex",
        width: "100%",
        height: 130,
        marginTop: 3,
        marginBottom: 4,
        justifyContent: "center",
        gap: "60px",
        borderRadius: "16px",
      }}
    >
      {StateCards.map((Card, index) => (
        <Box
          sx={{
            p: 2,

            maxWidth: 300,
            maxHeight: 130,
            boxShadow: 3,
            gap: "15px",
            borderRadius: "16px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              direction: "row",
              justifyContent: "space-between",
              alignItems: "start",
            }}
          >
            <Typography
              variant="h5"
              marginTop={3}
              marginLeft={2}
              sx={{ color: "#18BA51" }}
            >
              {Card.image}
            </Typography>
          </Box>

          <Box sx={{ p: 2 }}>
            <Typography fontSize={17} fontWeight={900}>
              {Card.top}
            </Typography>
            <Typography fontSize={13} color="text.secondary">
              {Card.bottom}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
