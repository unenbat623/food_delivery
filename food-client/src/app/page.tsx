import { Grid, Stack } from "@mui/material";
import Card from "@/components/Card/Card";
import HomeHeader from "@/components/Home/HomeHeader";
import OpenBox from "@/components/Header/ModalBox/modalBox";
import { Header } from "@/components";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <Grid container>
      <Header />
      <OpenBox />
      <HomeHeader />
      <Card />
      <Footer />
    </Grid>
  );
}
