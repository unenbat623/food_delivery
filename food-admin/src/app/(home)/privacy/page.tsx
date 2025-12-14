
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function PrivacyPage() {
    return (
        <Container>
            <Typography variant="h4" sx={{ mb: 5 }}>
                Нууцлалын бодлого
            </Typography>
            <Typography>
                Хэрэглэгчийн мэдээллийн нууцлалыг чанд хадгална.
            </Typography>
        </Container>
    );
}
