"use client";

import {
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Typography,
} from "@mui/material";

interface IFoodProps {
  data: {
    name: string;
    price: number;
    img: string;
  };
}

export const FoodCard = ({ data }: IFoodProps) => {
  return (
    <Card sx={{ width: "100%" }} style={{ border: "none", boxShadow: "none" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="100%"
          image={data.img || "/assets/images/food_back.png"}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.name}
          </Typography>
          <Typography variant="h6" sx={{ color: "#18BA51", fontWeight: 800 }}>
            {data.price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
