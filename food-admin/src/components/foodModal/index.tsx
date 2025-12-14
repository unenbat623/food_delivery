import * as React from "react";
import {
  Box,
  Button as MuiButton,
  Typography,
  Modal,
  Stack,
  styled,
  FormControlLabel,
  FormGroup,
  Checkbox,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { Button, Input } from "../core";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 750,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: 5,
  boxShadow: 22,
  p: 4,
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function FoodModal({
  handleClose,
  open,
  newFood,
  categories,
  handleChange,
  handleFileChange,
  handleSave,
}: any) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography variant="h3">Хоол нэмэх хэсэг</Typography>
            <MuiButton onClick={handleClose} sx={{ fontSize: 23 }}>
              X
            </MuiButton>
          </Stack>

          <Input
            label="Name"
            name="name"
            value={newFood.name}
            onChange={handleChange}
            desc="Хоолны нэрийг оруулна уу"
          />
          <Input
            label="Price"
            name="price"
            value={newFood.price}
            onChange={handleChange}
            desc="Үнийн дүнг оруулна уу"
          />
          <Input
            label="Description"
            name="description"
            value={newFood.description}
            onChange={handleChange}
            desc="Write food Description"
          />
          <Stack>
            <Input
              label="Discount"
              name="discountPrice"
              value={newFood.discountPrice}
              onChange={handleChange}
              desc="Хямдралын хувийг оруулна уу"
            />
            {/* <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="sale"
              />
            </FormGroup> */}
          </Stack>
          <Stack>
            <FormControl sx={{ m: 1, minWidth: 120 }} required>
              <InputLabel id="category-label">Катигори</InputLabel>
              <Select
                labelId="category-label"
                id="category-select"
                value={newFood.category}
                label="Катигори"
                name="category"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {categories &&
                  categories.map((cat: any) => (
                    <MenuItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </MenuItem>
                  ))}
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>
          </Stack>
          <MuiButton
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <VisuallyHiddenInput type="file" onChange={handleFileChange} />
          </MuiButton>
          <Button label="нэмэх" onClick={handleSave}></Button>
        </Box>
      </Modal>
    </div>
  );
}
