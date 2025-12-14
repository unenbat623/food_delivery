import { useState } from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { fCurrency } from "@/utils/format-number";

import Label from "@/components/label";

// ----------------------------------------------------------------------

export default function FoodCard({ product, onEdit, onDelete }: any) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleClose();
    onEdit(product);
  };

  const handleDelete = () => {
    handleClose();
    onDelete(product._id);
  };

  const renderStatus = (
    <Label
      variant="filled"
      color={(product.isSale === "sale" && "error") || "info"}
      sx={{
        zIndex: 9,
        top: 16,
        right: 16,
        position: "absolute",
        textTransform: "uppercase",
      }}
    >
      {product.isSale}
    </Label>
  );

  const renderImg = (
    <Box
      component="img"
      alt={product.name}
      src={product.image}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: "cover",
        position: "absolute",
      }}
    />
  );

  const renderPrice = (
    <Typography variant="subtitle1">
      <Typography
        component="span"
        variant="body1"
        sx={{
          color: "text.disabled",
          textDecoration: "line-through",
        }}
      >
        {product.discountPrice && fCurrency(product.discountPrice)}
      </Typography>
      &nbsp;
      {fCurrency(product.price)}
    </Typography>
  );

  return (
    <Card
      sx={{
        ":hover": {
          cursor: "pointer",
        },
        position: "relative",
      }}
    >
      <Box sx={{ pt: "100%", position: "relative" }}>
        {product.status && renderStatus}

        {renderImg}

        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            bgcolor: "rgba(255, 255, 255, 0.8)",
            "&:hover": { bgcolor: "white" },
          }}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleEdit} sx={{ color: "primary.main" }}>
            <EditIcon sx={{ mr: 1, fontSize: 20 }} /> Edit
          </MenuItem>
          <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
            <DeleteIcon sx={{ mr: 1, fontSize: 20 }} /> Delete
          </MenuItem>
        </Menu>
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
          {product.name}
        </Link>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          {renderPrice}
        </Stack>
      </Stack>
    </Card>
  );
}

