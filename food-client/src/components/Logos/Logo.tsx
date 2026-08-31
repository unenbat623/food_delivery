import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import Link from "next/link";

interface LogoProps {
  color?: string;
  textColor?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({
  color = "#18BA51",
  textColor = "#1e293b",
  size = 36,
}) => {
  return (
    <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10 }}>
      <Box
        sx={{
          width: size,
          height: size,
          borderRadius: "10px",
          bgcolor: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          boxShadow: "0 4px 10px rgba(24, 186, 81, 0.25)",
        }}
      >
        <RestaurantIcon sx={{ fontSize: size * 0.6 }} />
      </Box>
      <Typography
        sx={{
          fontWeight: 800,
          fontSize: size * 0.55,
          color: textColor,
          letterSpacing: "-0.5px",
          display: "flex",
          alignItems: "center",
          gap: 0.5,
        }}
      >
        <span>Food</span>
        <span style={{ color: color }}>Delivery</span>
      </Typography>
    </Link>
  );
};
