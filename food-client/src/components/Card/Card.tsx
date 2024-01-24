"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { Container } from "@mui/material";
import { relative } from "path";

export default function IntroDivider() {
  return (
    <Stack sx={{ boxShadow: "none" }}>
      <Container>
        <Box
          position="relative"
          height="200px"
          width="180px"
          sx={{ padding: "16px" }}
        >
          <Box>
            <Image
              alt=""
              src="food.svg"
              width={100}
              height={100}
              style={{
                width: "100%",
              }}
            />
            <Typography
              variant="h6"
              sx={{
                width: "40px",
                display: "flex",
                justifyContent: "center",
                color: "white",
                position: "absolute",
                borderRadius: "14px",
                top: "25px",
                right: "25px",
                background: "#18BA51",
                zIndex: 2,
                fontSize: "14px",
              }}
            >
              20%
            </Typography>
          </Box>
          <Box sx={{ p: 1 }}>
            <Typography variant="body2" fontWeight={900} fontSize={15}>
              Өглөөний цай
            </Typography>
            <Stack direction="row" spacing={3}>
              <Box sx={{ color: "#18BA51", fontWeight: "900" }}>4800₮</Box>
              <Box
                sx={{
                  color: "black",
                  fontWeight: "400",
                  textDecoration: "line-through",
                }}
              >
                6800₮
              </Box>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Stack>
  );
}
