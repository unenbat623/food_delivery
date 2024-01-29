import { Grid } from "@mui/material";
import HomeHeader from "@/components/Home/HomeHeader";
import { Header } from "@/components";
import Footer from "@/components/Footer/Footer";
import HomeProfile from "@/components/Home/HomeProfile";

export default function Home() {
  return (
    <Grid container>
      <HomeProfile />
      <HomeHeader />
    </Grid>
  );
}
