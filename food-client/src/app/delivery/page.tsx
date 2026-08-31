"use client";

import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Stack,
  Card,
  CardContent,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const DISTRICTS = [
  {
    name: "Сүхбаатар дүүрэг",
    areas: "1-20-р хороо (Төвийн бүс, Их тойруу, 11-р хороолол, Сэлбэ)",
    time: "20-30 мин",
    status: "Идэвхтэй",
  },
  {
    name: "Баянзүрх дүүрэг",
    areas: "1-28-р хороо (Офицеруудын ордон, 13-р хороолол, Жуков, Нарантуул, Кино үйлдвэр)",
    time: "25-35 мин",
    status: "Идэвхтэй",
  },
  {
    name: "Хан-Уул дүүрэг",
    areas: "1-21-р хороо (Зайсан, 120 мянгат, Төв цэнгэлдэх, Яармаг, Нисэх, River Garden)",
    time: "25-35 мин",
    status: "Идэвхтэй",
  },
  {
    name: "Чингэлтэй дүүрэг",
    areas: "1-19-р хороо (Тэнгис кино театр, 50 мянгат, Баянбүрд, 7 буудал)",
    time: "25-35 мин",
    status: "Идэвхтэй",
  },
  {
    name: "Баянгол дүүрэг",
    areas: "1-25-р хороо (3, 4-р хороолол, 10-р хороолол, Төмөр зам, Гэмтлийн эмнэлэг)",
    time: "25-35 мин",
    status: "Идэвхтэй",
  },
  {
    name: "Сонгинохайрхан дүүрэг",
    areas: "1-32-р хороо (1-р хороолол, Саппоро, Хархорин, Москва хороолол)",
    time: "30-40 мин",
    status: "Идэвхтэй",
  },
];

const FAQS = [
  {
    q: "Хүргэлт ямар хугацаанд ирдэг вэ?",
    a: "Захиалга баталгаажсанаас хойш хоол бэлтгэл болон хүргэлтийн хугацаа нийлээд дунджаар 25-35 минутанд таны хаягт хүрнэ. Цаг агаар болон замын хөдөлгөөний ачааллаас шалтгаалан хүргэлтийн хугацаанд бага зэргийн өөрчлөлт орж болно.",
  },
  {
    q: "Хүргэлтийн төлбөр хэд вэ?",
    a: "40,000₮-с дээш үнийн дүнтэй бүх захиалгын хүргэлт ҮНЭГҮЙ. 40,000₮-с доош захиалгын хүргэлтийн суурь төлбөр 4,000₮ байна.",
  },
  {
    q: "Төлбөрөө хэрхэн төлөх вэ?",
    a: "Та QPay, банкны карт, SocialPay эсвэл хоол хүлээн авахдаа бэлнээр төлөх боломжтой.",
  },
  {
    q: "Хүргэлтийн цагийн хуваарь ямар байдаг вэ?",
    a: "Манай хүргэлтийн алба өдөр бүр өглөөний 09:00 цагаас шөнийн 23:00 цаг хүртэл тасралтгүй үйлчилж байна.",
  },
];

export default function DeliveryPage() {
  return (
    <Container maxWidth="xl" sx={{ py: { xs: 4, md: 8 } }}>
      {/* Hero Header */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Chip
          icon={<LocalShippingIcon style={{ color: "#18BA51" }} />}
          label="Хүргэлтийн мэдээлэл"
          sx={{
            bgcolor: "rgba(24, 186, 81, 0.1)",
            color: "#18BA51",
            fontWeight: 700,
            mb: 2,
          }}
        />
        <Typography
          variant="h3"
          sx={{
            fontWeight: 900,
            fontSize: { xs: "2rem", md: "2.75rem" },
            color: "#1e293b",
            mb: 2,
          }}
        >
          Хүргэлтийн бүс ба нөхцөл
        </Typography>
        <Typography variant="body1" color="#64748b" sx={{ maxWidth: 640, mx: "auto" }}>
          Улаанбаатар хотын төвийн 6 дүүргийн бүх хороодод түргэн шуурхай, найдвартай хүргэнэ.
        </Typography>
      </Box>

      {/* Highlights Bar */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              p: 3,
              borderRadius: "16px",
              bgcolor: "#ffffff",
              border: "1px solid #f1f5f9",
              boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: 50,
                height: 50,
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
              <Typography fontWeight={700} fontSize="1rem">
                09:00 - 23:00
              </Typography>
              <Typography fontSize="0.85rem" color="#64748b">
                Өдөр бүр тасралтгүй хүргэлт
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box
            sx={{
              p: 3,
              borderRadius: "16px",
              bgcolor: "#ffffff",
              border: "1px solid #f1f5f9",
              boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: "12px",
                bgcolor: "rgba(245, 158, 11, 0.12)",
                color: "#f59e0b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LocalShippingIcon />
            </Box>
            <Box>
              <Typography fontWeight={700} fontSize="1rem">
                40,000₮+ Үнэгүй
              </Typography>
              <Typography fontSize="0.85rem" color="#64748b">
                Бусад тохиолдолд суурь 4,000₮
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box
            sx={{
              p: 3,
              borderRadius: "16px",
              bgcolor: "#ffffff",
              border: "1px solid #f1f5f9",
              boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: "12px",
                bgcolor: "rgba(59, 130, 246, 0.12)",
                color: "#3b82f6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PhoneInTalkIcon />
            </Box>
            <Box>
              <Typography fontWeight={700} fontSize="1rem">
                7711-8899
              </Typography>
              <Typography fontSize="0.85rem" color="#64748b">
                Хүргэлтийн лавлах утас
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* District Cards */}
      <Typography variant="h5" fontWeight={800} sx={{ mb: 3, color: "#1e293b" }}>
        Хүргэлтийн дүүргүүд
      </Typography>

      <Grid container spacing={3} sx={{ mb: 8 }}>
        {DISTRICTS.map((item, idx) => (
          <Grid key={idx} item xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: "100%",
                borderRadius: "18px",
                border: "1px solid #f1f5f9",
                boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                transition: "all 0.25s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
                  borderColor: "rgba(24, 186, 81, 0.3)",
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                    <LocationOnIcon sx={{ color: "#18BA51", fontSize: 24 }} />
                    <Typography variant="h6" fontWeight={800} fontSize="1.1rem">
                      {item.name}
                    </Typography>
                  </Box>
                  <Chip
                    icon={<CheckCircleIcon sx={{ fontSize: "14px !important", color: "#18BA51 !important" }} />}
                    label={item.status}
                    size="small"
                    sx={{
                      bgcolor: "rgba(24, 186, 81, 0.1)",
                      color: "#18BA51",
                      fontWeight: 700,
                      fontSize: "0.75rem",
                    }}
                  />
                </Box>

                <Typography variant="body2" color="#64748b" sx={{ mb: 2, lineHeight: 1.5 }}>
                  {item.areas}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    pt: 1.5,
                    borderTop: "1px solid #f8fafc",
                  }}
                >
                  <AccessTimeIcon sx={{ fontSize: 16, color: "#18BA51" }} />
                  <Typography fontSize="0.85rem" fontWeight={600} color="#1e293b">
                    Хүргэх хугацаа: <span style={{ color: "#18BA51" }}>{item.time}</span>
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* FAQs Section */}
      <Box sx={{ maxWidth: 800, mx: "auto" }}>
        <Typography
          variant="h5"
          fontWeight={800}
          textAlign="center"
          sx={{ mb: 4, color: "#1e293b" }}
        >
          Түгээмэл асуулт & Хариулт
        </Typography>

        <Stack spacing={2}>
          {FAQS.map((faq, index) => (
            <Accordion
              key={index}
              disableGutters
              elevation={0}
              sx={{
                border: "1px solid #f1f5f9",
                borderRadius: "14px !important",
                "&:before": { display: "none" },
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "#18BA51" }} />}>
                <Typography fontWeight={700} fontSize="0.95rem" color="#1e293b">
                  {faq.q}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ pt: 0, pb: 2.5 }}>
                <Typography fontSize="0.9rem" color="#64748b" lineHeight={1.6}>
                  {faq.a}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>
      </Box>
    </Container>
  );
}
