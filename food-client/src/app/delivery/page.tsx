"use client";

import { Container, Typography, Box } from "@mui/material";

export default function DeliveryPage() {
    return (
        <Container maxWidth="xl" sx={{ minHeight: "80vh", py: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom>
                Хүргэлтийн бүс
            </Typography>
            <Box sx={{ mt: 4 }}>
                <Typography variant="body1" color="text.secondary">
                    Хүргэлтийн бүсийн мэдээлэл удахгүй нэмэгдэнэ...
                </Typography>
            </Box>
        </Container>
    );
}
