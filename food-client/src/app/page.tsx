import { Grid } from "@mui/material";
import HomeHeader from "@/components/Home/HomeHeader";
import { All } from "@/components/Home/FoodCategory/All";
import HomeProfile from "@/components/Home/HomeProfile/index";
import ModalBox from "@/components/ModalBox/modalBox";

export default function Home() {
  return (
    <Grid container>
      <HomeProfile />
      <ModalBox />
      <HomeHeader />
      <All />
    </Grid>
  );
}
