"use client";

import React from "react";
import { Container, Typography, Box, Paper, Divider, Stack } from "@mui/material";

export default function PrivacyPage() {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 5 },
          borderRadius: "24px",
          border: "1px solid #f1f5f9",
          bgcolor: "#ffffff",
        }}
      >
        <Typography variant="h4" fontWeight={900} color="#1e293b" gutterBottom>
          Нууцлалын бодлого
        </Typography>
        <Typography variant="body2" color="#64748b" sx={{ mb: 4 }}>
          Сүүлд шинэчлэгдсэн: {new Date().getFullYear()} он
        </Typography>

        <Stack spacing={3}>
          <Box>
            <Typography variant="h6" fontWeight={700} color="#1e293b" gutterBottom>
              1. Мэдээлэл цуглуулалт
            </Typography>
            <Typography variant="body2" color="#475569" lineHeight={1.7}>
              Бид таны нэр, имэйл хаяг, утасны дугаар болон хүргэлтийн хаягийн мэдээллийг зөвхөн захиалгыг хүргэх, хэрэглэгчийн үйлчилгээ үзүүлэх зорилгоор аюулгүй цуглуулдаг.
            </Typography>
          </Box>

          <Divider />

          <Box>
            <Typography variant="h6" fontWeight={700} color="#1e293b" gutterBottom>
              2. Мэдээллийн аюулгүй байдал
            </Typography>
            <Typography variant="body2" color="#475569" lineHeight={1.7}>
              Таны хувийн мэдээллийг гуравдагч этгээдэд дамжуулахгүй бөгөөд орчин үеийн шифрлэлт, аюулгүй байдлын протоколуудаар найдвартай хамгаалдаг.
            </Typography>
          </Box>

          <Divider />

          <Box>
            <Typography variant="h6" fontWeight={700} color="#1e293b" gutterBottom>
              3. Хэрэглэгчийн эрх
            </Typography>
            <Typography variant="body2" color="#475569" lineHeight={1.7}>
              Та өөрийн мэдээллийг хүссэн үедээ шалгах, өөрчлөх эсвэл системээс устгах хүсэлт гаргах бүрэн эрхтэй.
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}
