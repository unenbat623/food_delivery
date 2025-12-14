"use client";

import {
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Typography,
} from "@mui/material";

interface IFoodProps {
  food: {
    name: string;
    price: number;
    image: string;
  };
}

const FoodCard = ({ food }: IFoodProps) => {
  return (
    <Card sx={{ width: "100%" }} style={{ border: "none", boxShadow: "none" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="100%"
          image={food.image || "/assets/images/food_back.png"}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {food.name}
          </Typography>
          <Typography variant="h6" sx={{ color: "#18BA51", fontWeight: 800 }}>
            {food.price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default FoodCard;
