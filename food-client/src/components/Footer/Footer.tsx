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
import { Logo } from "../Logos";
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
      padding={1}
      sx={{
        backgroundColor: "#18BA51",
        height: "545px",
        position: "relative",
      }}
      zIndex={-1000}
    >
      <Container>
        <Box
          color={"white"}
          padding={20}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            justifyContent: "center",
          }}
        >
          <Stack
            gap={3}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Logo />
            <Typography variant="h5" style={{ fontWeight: 600 }}>
              Food Delivery
            </Typography>
          </Stack>
          <List sx={{ display: "flex" }}>
            {navLinks.map((list, index) => (
              <ListItemButton
                key={index}
                sx={{ textAlign: "center" }}
                onClick={() => console.log(`clicked on ${list.text}`)}
              >
                <Link href={list.href} style={{ color: "#ffffff" }}>
                  {list.text}
                </Link>
              </ListItemButton>
            ))}
          </List>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={3}
          >
            {linkButtons.map((link, idx) => (
              <span key={idx}>{link.icon}</span>
            ))}
          </Stack>
          <Divider sx={{ backgroundColor: "white", borderWidth: "1px" }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography>&copy; 2024 Pinecone Foods LLC</Typography>
            <Typography>Зохиогчийн эрх хуулиар хамгаалагдсанв</Typography>
          </Box>
        </Box>
      </Container>
      <Box
        zIndex={-100}
        sx={{
          position: "absolute",
          height: "100%",
          width: "99%",
          top: 0,
          backgroundImage: `url(pattern.svg)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></Box>
    </Box>
  );
};

export default Footer;
