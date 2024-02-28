"use client";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import Iconify from "@/components/iconify";

import CategoryCard from "./category-card";
import CategorySort from "./category-sort";
import CategorySearch from "./category-search";

import CategoryModal from "@/components/categoryModal";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";

// ----------------------------------------------------------------------

export default function CategoryView() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<{}[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.currentTarget.files![0]);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(() => false);
  };

  const createCategory = async () => {
    try {
      const formData = new FormData();
      formData.set("image", file!);
      formData.set("name", newCategory.name);
      formData.set("description", newCategory.description);
      const token = localStorage.getItem("token");

      const {
        data: { category },
      } = (await axios.post("http://localhost:8080/categories", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })) as {
        data: { category: object };
      };

      setCategories((prevCat) => [...prevCat, categories]);
      console.log("Success Add Category");
    } catch (error: any) {
      alert("Add Error - " + error.message);
    }
  };

  const getCategory = async () => {
    try {
      const {
        data: { categories },
      } = (await axios.get("http://localhost:8080/categories")) as {
        data: { categories: [] };
      };

      setCategories(categories);
    } catch (error: any) {
      alert("Get Error - " + error.message);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4">Ангилалын жагсаалт</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleOpen}
        >
          Шинэ ангилал
        </Button>
      </Stack>
      {/* <Stack
        mb={5}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <CategorySearch categories={categories} />
        <CategorySort
          options={[
            { value: "latest", label: "Cүүлийнх" },
            { value: "popular", label: "Түгээмэл" },
            { value: "oldest", label: "Өмнөх" },
          ]}
        />
      </Stack> */}
      <Grid container spacing={3}>
        {categories?.map((category: any) => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </Grid>
      <CategoryModal
        open={open}
        handleClose={handleClose}
        newCategory={newCategory}
        handleChange={handleChange}
        handleFileChange={handleFileChange}
        handleSave={createCategory}
      />
    </Container>
  );
}
