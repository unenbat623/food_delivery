"use client";
import {
  Box,
  Container,
  Divider,
  List,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/material";
import { Logo } from "../../Logos";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const navLinks = [
  { text: "Нүүр", href: "/" },
  { text: "Холбоо барих", href: "/" },
  { text: "Хоолны цэс", href: "/" },
  { text: "Үйлчилгээний нөхцөл", href: "/" },
  { text: "Хүргэлтийн бүс", href: "/" },
  { text: "Нууцлалын бодлого", href: "/" },
];

const linkButtons = [
  { icon: <FaFacebook size={40} />, href: "https://www.facebook.com/" },
  { icon: <FaInstagram size={40} />, href: "https://www.instagram.com/" },
  { icon: <FaTwitter size={40} />, href: "https://twitter.com/" },
];

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#18BA51",
        color: "white",
        py: 8,
        px: 2,
        mt: 'auto',
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={6} alignItems="center">
          {/* Logo Section */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
          >
            <Logo />
            <Typography variant="h5" fontWeight={600} color="white">
              Food Delivery
            </Typography>
          </Stack>

          {/* Navigation Links */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 4,
            }}
          >
            {navLinks.map((list, index) => (
              <Link
                key={index}
                href={list.href}
                style={{
                  color: "white",
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                  fontSize: "16px",
                  fontWeight: 500,
                }}
              >
                {list.text}
              </Link>
            ))}
          </Box>

          {/* Social Icons */}
          <Stack direction="row" spacing={3}>
            {linkButtons.map((link, idx) => (
              <Box
                key={idx}
                component="a"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "white",
                  transition: "transform 0.2s",
                  "&:hover": { transform: "scale(1.1)" },
                }}
              >
                {link.icon}
              </Box>
            ))}
          </Stack>

          <Divider sx={{ width: "100%", borderColor: "rgba(255,255,255,0.3)" }} />

          {/* Copyright */}
          <Box sx={{ textAlign: "center", opacity: 0.9 }}>
            <Typography variant="body2" gutterBottom>
              &copy; 2024 Pinecone Foods LLC
            </Typography>
            <Typography variant="body2">
              Зохиогчийн эрх хуулиар хамгаалагдсан
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
