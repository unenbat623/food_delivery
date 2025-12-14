"use client";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import Iconify from "@/components/iconify";

import CategoryCard from "./category-card";
import CategorySearch from "./category-search";

import CategoryModal from "@/components/categoryModal";
import { ChangeEvent, useEffect, useState } from "react";
import instanceAxios from "@/utils/axios";
import { toast } from "react-toastify";

// ----------------------------------------------------------------------

export default function CategoryView() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<{}[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [filterName, setFilterName] = useState("");

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
      let imageUrl = "";
      if (file) {
        const formData = new FormData();
        formData.append("image", file);
        const { data } = await instanceAxios.post("/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        imageUrl = data.url;
      }

      const token = localStorage.getItem("token");

      const {
        data: { category },
      } = (await instanceAxios.post(
        "/categories",
        { ...newCategory, image: imageUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )) as {
        data: { category: any };
      };

      setCategories((prevCat) => [...prevCat, category]);
      toast.success("Ангилал амжилттай нэмэгдлээ");
      handleClose();
      setNewCategory({ name: "", description: "" });
      setFile(null);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Ангилал нэмэхэд алдаа гарлаа");
    }
  };

  const getCategory = async () => {
    try {
      const token = localStorage.getItem("token");
      const {
        data: { categories },
      } = (await instanceAxios.get("/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })) as {
        data: { categories: [] };
      };
      setCategories(categories);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Ангилал татахад алдаа гарлаа");
    }
  };

  const handleSearch = (name: string) => {
    setFilterName(name);
  };

  const filteredCategories = categories.filter((category: any) =>
    category.name.toLowerCase().includes(filterName.toLowerCase())
  );

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
      <Stack mb={5}>
        <CategorySearch categories={categories} onSearch={handleSearch} />
      </Stack>
      <Grid container spacing={3}>
        {filteredCategories?.map((category: any) => (
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
