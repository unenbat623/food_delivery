"use client";

import { Container, Typography, Box } from "@mui/material";

export default function MenuPage() {
    return (
        <Container maxWidth="xl" sx={{ minHeight: "80vh", py: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom>
                Хоолны цэс
            </Typography>
            <Box sx={{ mt: 4 }}>
                <Typography variant="body1" color="text.secondary">
                    Хоолны цэс удахгүй нэмэгдэнэ...
                </Typography>
            </Box>
        </Container>
    );
}
