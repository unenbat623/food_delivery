import { Container, Typography, Box, Paper, Grid } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function DeliveryAreaPage() {
    const areas = [
        "Баянзүрх дүүрэг",
        "Сүхбаатар дүүрэг",
        "Чингэлтэй дүүрэг",
        "Хан-Уул дүүрэг",
        "Баянгол дүүрэг",
        "Сонгинохайрхан дүүрэг",
    ];

    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <Typography variant="h3" sx={{ mb: 4, fontWeight: "bold", color: "primary.main" }}>
                Delivery Areas
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                We currently deliver to the following areas in Ulaanbaatar:
            </Typography>

            <Grid container spacing={2}>
                {areas.map((area, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                        <Paper
                            sx={{
                                p: 2,
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                borderRadius: 2,
                                "&:hover": {
                                    boxShadow: 3,
                                },
                            }}
                        >
                            <LocationOnIcon color="primary" />
                            <Typography variant="body1">{area}</Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ mt: 4, p: 3, bgcolor: "primary.lighter", borderRadius: 2 }}>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
                    Delivery Time
                </Typography>
                <Typography variant="body1">
                    Standard delivery: 30-45 minutes
                </Typography>
            </Box>
        </Container>
    );
}
