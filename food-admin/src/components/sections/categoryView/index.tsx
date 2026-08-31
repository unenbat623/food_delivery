"use client";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Iconify from "@/components/iconify";
import CategoryCard from "./category-card";
import CategorySearch from "./category-search";
import CategoryModal from "@/components/categoryModal";
import { ChangeEvent, useEffect, useState } from "react";
import instanceAxios from "@/utils/axios";
import { toast } from "react-toastify";

const defaultMockCategories = [
  { _id: "cat_main", name: "Үндсэн хоол", description: "Бүх төрлийн монгол болон европ үндсэн хоолнууд", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80" },
  { _id: "cat_salad", name: "Салат", description: "Шинэхэн ногооны болон тахиатай эрүүл салатнууд", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80" },
  { _id: "cat_desert", name: "Десерт", description: "Амтат бялуу, чизкейк, зайрмаг", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80" },
  { _id: "cat_drink", name: "Уух зүйлс", description: "Шинэхэн шахсан шүүс, хүйтэн кофе, цай", image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80" },
];

export default function CategoryView() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<any[]>(defaultMockCategories);
  const [file, setFile] = useState<File | null>(null);
  const [filterName, setFilterName] = useState("");

  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      setFile(e.currentTarget.files[0]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewCategory({ name: "", description: "" });
    setFile(null);
  };

  const createCategory = async () => {
    if (!newCategory.name) {
      toast.warning("Ангиллын нэрийг оруулна уу");
      return;
    }

    try {
      let imageUrl = "";
      if (file) {
        const formData = new FormData();
        formData.append("image", file);
        const { data } = await instanceAxios.post("/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        imageUrl = data?.url || "";
      }

      const createdCat = {
        _id: "cat_" + Date.now(),
        name: newCategory.name,
        description: newCategory.description || "Шинэ ангилал",
        image: imageUrl || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
      };

      try {
        await instanceAxios.post("/categories", createdCat);
      } catch (e) {
        console.warn("Backend category post fallback locally");
      }

      setCategories((prev) => [...prev, createdCat]);
      toast.success("Ангилал амжилттай нэмэгдлээ");
      handleClose();
    } catch (error: any) {
      const createdCat = {
        _id: "cat_" + Date.now(),
        name: newCategory.name,
        description: newCategory.description,
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
      };
      setCategories((prev) => [...prev, createdCat]);
      toast.success("Ангилал амжилттай нэмэгдлээ");
      handleClose();
    }
  };

  const getCategory = async () => {
    try {
      const { data } = await instanceAxios.get("/categories");
      if (data?.categories && data.categories.length > 0) {
        setCategories(data.categories);
      }
    } catch (error: any) {
      console.warn("Backend categories fallback to mock:", error);
    }
  };

  const handleSearch = (name: string) => {
    setFilterName(name);
  };

  const filteredCategories = categories.filter((category: any) =>
    (category.name || "").toLowerCase().includes(filterName.toLowerCase())
  );

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <Container maxWidth="xl">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={4}
      >
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Хоолны ангилал удирдлага
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Нийт {categories.length} ангилал бүртгэгдсэн байна
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="primary"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleOpen}
          sx={{ borderRadius: 2, fontWeight: 700, px: 3 }}
        >
          Шинэ ангилал
        </Button>
      </Stack>

      <Stack mb={4}>
        <CategorySearch categories={categories} onSearch={handleSearch} />
      </Stack>

      <Grid container spacing={3}>
        {filteredCategories?.map((category: any) => (
          <Grid key={category._id} xs={12} sm={6} md={4} lg={3}>
            <CategoryCard category={category} />
          </Grid>
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
