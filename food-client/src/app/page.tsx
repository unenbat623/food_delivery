import { Grid } from "@mui/material";
import HomeHeader from "@/components/Home/HomeHeader";
import { All } from "@/components/Home/FoodCategory/All";
import HomeProfile from "@/components/Home/HomeProfile/index";

export default function Home() {
  return (
    <Grid container>
      <HomeProfile />
      <HomeHeader />
      <All />
    </Grid>
  );
}
