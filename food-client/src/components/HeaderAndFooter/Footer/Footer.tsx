"use client";

import React from "react";
import {
  Box,
  Container,
  Divider,
  Stack,
  Typography,
  Grid,
} from "@mui/material";
import { Logo } from "../../Logos";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

const navLinks = [
  { text: "Нүүр хуудас", href: "/" },
  { text: "Хоолны цэс", href: "/menu" },
  { text: "Хүргэлтийн бүс", href: "/delivery" },
  { text: "Үйлчилгээний нөхцөл", href: "/terms" },
  { text: "Нууцлалын бодлого", href: "/privacy" },
  { text: "Холбоо барих", href: "/contact" },
];

const linkButtons = [
  { icon: <FaFacebook size={22} />, href: "https://www.facebook.com/" },
  { icon: <FaInstagram size={22} />, href: "https://www.instagram.com/" },
  { icon: <FaTwitter size={22} />, href: "https://twitter.com/" },
  { icon: <FaYoutube size={22} />, href: "https://youtube.com/" },
];

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#18BA51",
        color: "#ffffff",
        pt: { xs: 6, md: 8 },
        pb: 4,
        mt: "auto",
        backgroundImage: "radial-gradient(circle at 50% 100%, rgba(0,0,0,0.15) 0%, transparent 60%)",
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {/* Col 1: Brand info */}
          <Grid item xs={12} md={4}>
            <Stack spacing={2}>
              <Box sx={{ display: "inline-block" }}>
                <Logo color="#ffffff" textColor="#ffffff" size={38} />
              </Box>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.85)", lineHeight: 1.6, maxWidth: 340 }}>
                Шилдэг тогооч нарын бэлтгэсэн амтат зоогийг 30 минутын дотор халуунаар нь таны үүдэнд түргэн шуурхай хүргэнэ.
              </Typography>
              <Stack direction="row" spacing={1.5} sx={{ pt: 1 }}>
                {linkButtons.map((link, idx) => (
                  <Box
                    key={idx}
                    component="a"
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "10px",
                      bgcolor: "rgba(255,255,255,0.15)",
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        bgcolor: "#ffffff",
                        color: "#18BA51",
                        transform: "translateY(-3px)",
                      },
                    }}
                  >
                    {link.icon}
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Grid>

          {/* Col 2: Navigation Links */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2.5, color: "#ffffff" }}>
              Хэрэгцээт холбоосууд
            </Typography>
            <Grid container spacing={1.5}>
              {navLinks.map((item, index) => (
                <Grid item xs={6} key={index}>
                  <Link
                    href={item.href}
                    style={{
                      color: "rgba(255,255,255,0.85)",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      display: "inline-block",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {item.text}
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Col 3: Contact info */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2.5, color: "#ffffff" }}>
              Холбоо барих
            </Typography>
            <Stack spacing={2} sx={{ color: "rgba(255,255,255,0.85)", fontSize: "0.9rem" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <LocationOnIcon fontSize="small" />
                <span>Улаанбаатар хот, Сүхбаатар дүүрэг, 1-р хороо</span>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <PhoneIcon fontSize="small" />
                <span>Хүргэлтийн утас: 7711-8899, 9911-2233</span>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <EmailIcon fontSize="small" />
                <span>info@fooddelivery.mn</span>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.2)", mb: 3 }} />

        {/* Copyright */}
        <Box sx={{ textAlign: "center", color: "rgba(255,255,255,0.75)" }}>
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} Pinecone Food Delivery LLC. Бүх эрх хуулиар хамгаалагдсан.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
