import { Container, Typography, Box, Divider } from "@mui/material";

export default function TermsPage() {
    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <Typography variant="h3" sx={{ mb: 4, fontWeight: "bold", color: "primary.main" }}>
                Terms of Service
            </Typography>

            <Box sx={{ "& > *": { mb: 3 } }}>
                <Box>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                        1. Acceptance of Terms
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        By accessing and using Pinecone Food Delivery service, you accept and agree to be bound by the terms and provision of this agreement.
                    </Typography>
                </Box>

                <Divider />

                <Box>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                        2. Use of Service
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Our service is provided for personal, non-commercial use. You agree to use the service only for lawful purposes.
                    </Typography>
                </Box>

                <Divider />

                <Box>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                        3. Order and Payment
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        All orders are subject to availability. Payment must be made at the time of order placement.
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
}
