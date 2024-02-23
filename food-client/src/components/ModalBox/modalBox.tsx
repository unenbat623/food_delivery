"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Button, MuiButton } from "@mui/material";
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
  width: 700,

  bgcolor: "background.paper",
  border: "1px solid #ffffff",
  boxShadow: 24,
  p: 4,
};

export default function ModalBox() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [count, setCount] = React.useState(1);

  const handleCount = (operation: string) => {
    if (operation === "zero") {
      setCount(count + 0);
    } else operation === "add";
    {
      setCount(count + 1);
    }
    if (operation === "min") {
      setCount(count - 1);
    }
  };

  return (
    <Button onClick={handleOpen}>
      {" "}
      open
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid display="flex">
          <Box sx={style} borderRadius={3} display={"flex"} gap={5}>
            <Image alt="" src="/image.jpg" width={370} height={370} />
            <Stack direction="column">
              <Button sx={{ justifyContent: "end" }}>
                <Image alt="" src="close.svg" width={20} height={20} />
              </Button>
              <Typography id="modal-modal-title" variant="h5" fontWeight={700}>
                Main Pizza
              </Typography>
              <Typography
                sx={{ color: "#18BA51", fontSize: 15, fontWeight: 900 }}
              >
                34,800₮
              </Typography>
              <Typography sx={{ fontWeight: 600, marginTop: 3 }}>
                Орц
                <Typography
                  sx={{
                    background: "#F6F6F6",
                    color: "#767676",
                    width: "280px",
                    height: "50px",
                    fontSize: 13,
                    padding: 1,
                    borderRadius: 1,
                    marginTop: 2,
                  }}
                >
                  Хулуу, төмс, лууван , сонгино, цөцгийн тос, самрын үр{" "}
                </Typography>
              </Typography>
              <Typography fontWeight={700} marginTop={3} marginBottom={3}>
                Тоо
              </Typography>
              <Box display={"flex"} gap={1}>
                <MuiButton onClick={() => handleCount("min")}>
                  <Remove
                    sx={{
                      bgcolor: "#18BA51",
                      color: "white",
                      width: "70%",
                      height: "30px",
                      borderRadius: 2,
                    }}
                  />
                </MuiButton>
                <input
                  type="text"
                  value={count}
                  style={{
                    width: "60px",
                    border: "none",
                    textAlign: "center",
                    paddingTop: 4,
                    paddingBottom: 4,
                    fontWeight: 600,
                    fontSize: 16,
                  }}
                />
                <MuiButton onClick={() => handleCount("add")}>
                  <Add
                    sx={{
                      bgcolor: "#18BA51",
                      color: "white",
                      width: "70%",
                      height: "30px",
                      borderRadius: 2,
                    }}
                  />
                </MuiButton>
              </Box>
              <Stack
                sx={{
                  background: "#18BA51",
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 3,
                }}
              >
                <Button sx={{ color: "white" }}>Сагслах</Button>
              </Stack>
            </Stack>
          </Box>
        </Grid>
      </Modal>
    </Button>
  );
}
