"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { fShortenNumber } from "@/utils/format-number";

// ----------------------------------------------------------------------

import { alpha, useTheme } from "@mui/material/styles";

// ----------------------------------------------------------------------

export default function AppWidgetSummary({
  title,
  total,
  icon,
  color = "primary",
  sx,
  ...other
}: any) {
  const theme = useTheme();

  return (
    <Card
      component={Stack}
      spacing={3}
      direction="row"
      sx={{
        px: 3,
        py: 5,
        borderRadius: 2,
        boxShadow: "0px 10px 40px -10px rgba(0,0,0,0.08)",
        transition: "all 0.3s",
        background: `linear-gradient(135deg, ${alpha(
          (theme.palette as any)[color].lighter,
          0.48
        )} 0%, ${alpha((theme.palette as any)[color].light, 0.48)} 100%)`,
        color: `${color}.darker`,
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "0px 20px 40px -10px rgba(0,0,0,0.12)",
        },
        ...sx,
      }}
      {...other}
    >
      {icon && (
        <Box
          sx={{
            width: 64,
            height: 64,
            lineHeight: 0,
            borderRadius: "50%",
            bgcolor: "background.paper",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 8px 16px 0 ${alpha((theme.palette as any)[color].main, 0.24)}`,
          }}
        >
          {icon}
        </Box>
      )}

      <Stack spacing={0.5}>
        <Typography variant="h4">{fShortenNumber(total)}</Typography>

        <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
          {title}
        </Typography>
      </Stack>
    </Card>
  );
}
