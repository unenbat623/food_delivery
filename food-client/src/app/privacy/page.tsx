import { Container, Typography, Box, Divider } from "@mui/material";

export default function PrivacyPage() {
    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <Typography variant="h3" sx={{ mb: 4, fontWeight: "bold", color: "primary.main" }}>
                Privacy Policy
            </Typography>

            <Box sx={{ "& > *": { mb: 3 } }}>
                <Box>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                        Information Collection
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        We collect information you provide directly to us when you create an account, place an order, or contact us for support.
                    </Typography>
                </Box>

                <Divider />

                <Box>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                        Data Security
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure.
                    </Typography>
                </Box>

                <Divider />

                <Box>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                        Your Rights
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        You have the right to access, update, or delete your personal information at any time through your account settings.
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
}
