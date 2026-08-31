"use client";

import React from "react";
import { Container, Typography, Box, Paper, Divider, Stack } from "@mui/material";

export default function TermsPage() {
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
          Үйлчилгээний нөхцөл
        </Typography>
        <Typography variant="body2" color="#64748b" sx={{ mb: 4 }}>
          Сүүлд шинэчлэгдсэн: {new Date().getFullYear()} он
        </Typography>

        <Stack spacing={3}>
          <Box>
            <Typography variant="h6" fontWeight={700} color="#1e293b" gutterBottom>
              1. Ерөнхий зүйл
            </Typography>
            <Typography variant="body2" color="#475569" lineHeight={1.7}>
              Pinecone Food Delivery веб сайт болон аппликейшнийг ашигласнаар та энэхүү үйлчилгээний нөхцөлийг бүрэн хүлээн зөвшөөрч байгаа болно. Манай систем нь хэрэглэгчдийг шилдэг зоогийн газруудын шинэхэн амтат хоолоор түргэн шуурхай хангах үүрэгтэй.
            </Typography>
          </Box>

          <Divider />

          <Box>
            <Typography variant="h6" fontWeight={700} color="#1e293b" gutterBottom>
              2. Захиалга ба Төлбөр тооцоо
            </Typography>
            <Typography variant="body2" color="#475569" lineHeight={1.7}>
              Хэрэглэгч захиалгаа өгөхдөө хүргэлтийн хаяг, утасны дугаараа үнэн зөв оруулах шаардлагатай. Төлбөрийг QPay, банкны карт эсвэл бэлнээр төлөх боломжтой. Захиалга баталгаажсаны дараа гал тогоонд шууд бэлтгэгдэж эхэлнэ.
            </Typography>
          </Box>

          <Divider />

          <Box>
            <Typography variant="h6" fontWeight={700} color="#1e293b" gutterBottom>
              3. Хүргэлтийн нөхцөл
            </Typography>
            <Typography variant="body2" color="#475569" lineHeight={1.7}>
              Хүргэлтийн дундаж хугацаа 25-35 минут байна. 40,000₮-с дээш үнийн дүнтэй захиалгын хүргэлт үнэгүй бөгөөд түүнээс доош дүнд 4,000₮ хүргэлтийн суурь хураамж тооцогдоно.
            </Typography>
          </Box>

          <Divider />

          <Box>
            <Typography variant="h6" fontWeight={700} color="#1e293b" gutterBottom>
              4. Захиалга цуцлах ба буцаалт
            </Typography>
            <Typography variant="body2" color="#475569" lineHeight={1.7}>
              Захиалга хийгдснээс хойш 5 минутын дотор цуцлах хүсэлт гаргах боломжтой. Хоол бэлтгэгдэж хүргэлтэд гарсан тохиолдолд захиалгыг цуцлах боломжгүйг анхаарна уу.
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}
