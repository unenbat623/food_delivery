import { Grid, Button, Typography } from "@mui/material";
import "./globals.css";

export default function Home() {
  return (
    <main>
      <Grid container className="container">
        <Grid item xs={12} md={6} sx={{ background: "gray" }}>
          <Typography variant="h1">Welcome Mui Framework</Typography>
        </Grid>
        <Grid item xs={12} md={6} sx={{ background: "purple" }}>
          <Button variant="contained" color="secondary">
            Click
          </Button>
        </Grid>
      </Grid>
    </main>
  );
}
