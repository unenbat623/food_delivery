import { Container, Typography, Box, Stack, Link } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function ContactPage() {
    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <Typography variant="h3" sx={{ mb: 4, fontWeight: "bold", color: "primary.main" }}>
                Contact Us
            </Typography>

            <Stack spacing={4}>
                <Box>
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                        <PhoneIcon color="primary" />
                        <Typography variant="h6">Phone</Typography>
                    </Stack>
                    <Typography variant="body1" color="text.secondary">
                        +976 9911-XXXX
                    </Typography>
                </Box>

                <Box>
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                        <EmailIcon color="primary" />
                        <Typography variant="h6">Email</Typography>
                    </Stack>
                    <Typography variant="body1" color="text.secondary">
                        support@pinecone-food.com
                    </Typography>
                </Box>

                <Box>
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                        <LocationOnIcon color="primary" />
                        <Typography variant="h6">Address</Typography>
                    </Stack>
                    <Typography variant="body1" color="text.secondary">
                        Ulaanbaatar, Mongolia
                    </Typography>
                </Box>
            </Stack>
        </Container>
    );
}
