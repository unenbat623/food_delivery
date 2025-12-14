"use client";

import { useState, useEffect } from "react";

import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import instanceAxios from "@/utils/axios";
import { toast } from "react-toastify";

import FoodCard from "./food-card";
import FoodModal from "@/components/foodModal";
import Button from "@mui/material/Button";

// ----------------------------------------------------------------------

export default function FoodView() {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [currentFoodId, setCurrentFoodId] = useState<string | null>(null);
  const [newFood, setNewFood] = useState({
    name: "",
    price: "",
    discountPrice: "",
    description: "",
    category: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewFood({
      name: "",
      price: "",
      discountPrice: "",
      description: "",
      category: "",
    });
    setFile(null);
    setCurrentFoodId(null);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setNewFood({ ...newFood, [name]: value });
  };

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const getFoods = async () => {
    try {
      const { data: { foods } } = (await instanceAxios.get("/foods")) as {
        data: { foods: [] };
      };
      setFoods(foods);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Хоол татахад алдаа гарлаа");
    }
  };

  const getCategories = async () => {
    try {
      const { data: { categories } } = (await instanceAxios.get("/categories")) as {
        data: { categories: [] };
      };
      setCategories(categories);
    } catch (error: any) {
      toast.error("Категори татахад алдаа гарлаа");
    }
  };

  const saveFood = async () => {
    try {
      let imageUrl = "";
      if (file) {
        const formData = new FormData();
        formData.append("image", file);
        const { data } = await instanceAxios.post("/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        imageUrl = data.url;
      }

      const foodData = {
        ...newFood,
        ...(imageUrl && { image: imageUrl }), // Only update image if new file
      };

      if (currentFoodId) {
        await instanceAxios.put(`/foods/${currentFoodId}`, { updateFood: foodData });
        toast.success("Хоол амжилттай шинэчлэгдлээ");
      } else {
        await instanceAxios.post("/foods", { ...foodData, image: imageUrl || "no-food-photo" });
        toast.success("Хоол амжилттай нэмэгдлээ");
      }

      getFoods(); // Refresh list
      handleClose();
    } catch (error: any) {
      toast.error("Хоол хадгалахад алдаа гарлаа");
    }
  };

  const handleEdit = (food: any) => {
    setNewFood({
      name: food.name,
      price: food.price,
      discountPrice: food.discountPrice,
      description: food.description,
      category: food.category?._id || food.category,
    });
    setCurrentFoodId(food._id);
    setOpen(true);
  };

  const handleDelete = async (foodId: string) => {
    if (confirm("Та энэ хоолыг устгахдаа итгэлтэй байна уу?")) {
      try {
        await instanceAxios.delete(`/foods/${foodId}`);
        toast.success("Хоол амжилттай устгагдлаа");
        getFoods();
      } catch (error) {
        toast.error("Хоол устгахад алдаа гарлаа");
      }
    }
  };

  useEffect(() => {
    getFoods();
    getCategories();
  }, []);

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4">Хоолны жагсаалт</Typography>
        <Button
          variant="contained"
          color="inherit"
          onClick={handleOpen}
        >
          Шинэ хоол
        </Button>
      </Stack>

      <Grid container spacing={3}>
        {foods.map((food: any) => (
          <Grid key={food._id} xs={12} sm={6} md={3}>
            <FoodCard
              product={food}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Grid>
        ))}
      </Grid>

      <FoodModal
        open={open}
        handleClose={handleClose}
        newFood={newFood}
        categories={categories}
        handleChange={handleChange}
        handleFileChange={handleFileChange}
        handleSave={saveFood}
      />
    </Container>
  );
}
