"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Button, IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import { Grid, Stack } from "@mui/material";
import { Remove, Add, Close } from "@mui/icons-material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: "80%", md: 700 },
  maxWidth: "90vw",
  maxHeight: "90vh",
  overflow: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 3,
  p: { xs: 2, sm: 3, md: 4 },
};

export default function ModalBox() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [count, setCount] = useState(1);

  const handleCount = (operation: string) => {
    if (operation === "add") {
      setCount(count + 1);
    } else if (operation === "min") {
      if (count > 1) {
        setCount(count - 1);
      }
    }
  };

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log(`Adding ${count} items to cart`);
    handleClose();
  };

  return (
    <>
      <Button onClick={handleOpen} variant="contained">
        Open Modal
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {/* Close Button */}
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
              <IconButton
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: "grey.500",
                }}
              >
                <Close />
              </IconButton>
            </Grid>

            {/* Image Section */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: { xs: 250, sm: 300, md: 370 },
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <Image
                  alt="Main Pizza"
                  src="/image.jpg"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </Box>
            </Grid>

            {/* Content Section */}
            <Grid item xs={12} md={6}>
              <Stack spacing={2}>
                {/* Title */}
                <Typography variant="h5" fontWeight={700}>
                  Main Pizza
                </Typography>

                {/* Price */}
                <Typography sx={{ color: "#18BA51", fontSize: 18, fontWeight: 700 }}>
                  34,800₮
                </Typography>

                {/* Ingredients */}
                <Box>
                  <Typography sx={{ fontWeight: 600, mb: 1 }}>
                    Орц
                  </Typography>
                  <Typography
                    sx={{
                      background: "#F6F6F6",
                      color: "#767676",
                      fontSize: 13,
                      p: 1.5,
                      borderRadius: 1,
                    }}
                  >
                    Хулуу, төмс, лууван, сонгино, цөцгийн тос, самрын үр
                  </Typography>
                </Box>

                {/* Quantity */}
                <Box>
                  <Typography fontWeight={700} mb={1}>
                    Тоо
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <IconButton
                      onClick={() => handleCount("min")}
                      disabled={count <= 1}
                      sx={{
                        bgcolor: "#18BA51",
                        color: "white",
                        "&:hover": { bgcolor: "#15a045" },
                        "&:disabled": { bgcolor: "#ccc" },
                      }}
                    >
                      <Remove />
                    </IconButton>

                    <Typography
                      sx={{
                        minWidth: 60,
                        textAlign: "center",
                        fontWeight: 600,
                        fontSize: 18,
                      }}
                    >
                      {count}
                    </Typography>

                    <IconButton
                      onClick={() => handleCount("add")}
                      sx={{
                        bgcolor: "#18BA51",
                        color: "white",
                        "&:hover": { bgcolor: "#15a045" },
                      }}
                    >
                      <Add />
                    </IconButton>
                  </Stack>
                </Box>

                {/* Add to Cart Button */}
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleAddToCart}
                  sx={{
                    bgcolor: "#18BA51",
                    color: "white",
                    py: 1.5,
                    fontSize: 16,
                    fontWeight: 600,
                    borderRadius: 2,
                    "&:hover": { bgcolor: "#15a045" },
                    mt: 2,
                  }}
                >
                  Сагслах
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
