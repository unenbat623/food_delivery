import {
  Button,
  Container,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import FoodCard from "./Card/Card";
import Link from "next/link";

const FoodList = ({ category, foods }: any) => {
  return (
    <Container>
      <Grid
        sx={{ mt: 3, pt: 3 }}
        container
        spacing={4}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h6" fontWeight="800">
          {category?.name}
        </Typography>

        <Link href={`/categories/123`}>
          <Button>Бүгдийг харах</Button>
        </Link>
      </Grid>
      <Grid container>
        {!foods && (
          <Stack
            width={"100%"}
            direction="row"
            justifyContent="space-between"
            gap={10}
          >
            <Skeleton height={200} width={"100%"}></Skeleton>
            <Skeleton height={200} width={"100%"}></Skeleton>
            <Skeleton height={200} width={"100%"}></Skeleton>
            <Skeleton height={200} width={"100%"}></Skeleton>
          </Stack>
        )}
        {foods &&
          foods?.map((food: any) => <FoodCard key={food?._id} food={food} />)}
      </Grid>
    </Container>
  );
};

export default FoodList;
