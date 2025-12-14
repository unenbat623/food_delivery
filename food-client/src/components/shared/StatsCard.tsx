"use client";

import { Box, Card, Stack, Typography, alpha, useTheme } from "@mui/material";

interface StatsCardProps {
    title: string;
    value: string | number;
    icon?: React.ReactNode;
    color?: "primary" | "success" | "info" | "warning" | "error";
}

export default function StatsCard({
    title,
    value,
    icon,
    color = "primary",
}: StatsCardProps) {
    const theme = useTheme();

    return (
        <Card
            sx={{
                p: 3,
                borderRadius: 2,
                boxShadow: "0px 10px 40px -10px rgba(0,0,0,0.08)",
                transition: "all 0.3s",
                background: `linear-gradient(135deg, ${alpha(
                    (theme.palette[color] as any).lighter || theme.palette[color].light,
                    0.48
                )} 0%, ${alpha(
                    (theme.palette[color] as any).light || theme.palette[color].main,
                    0.48
                )} 100%)`,
                "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: "0px 20px 40px -10px rgba(0,0,0,0.12)",
                },
            }}
        >
            <Stack direction="row" spacing={3} alignItems="center">
                {icon && (
                    <Box
                        sx={{
                            width: 64,
                            height: 64,
                            borderRadius: "50%",
                            bgcolor: "background.paper",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: `0 8px 16px 0 ${alpha(
                                theme.palette[color].main,
                                0.24
                            )}`,
                        }}
                    >
                        {icon}
                    </Box>
                )}

                <Stack spacing={0.5}>
                    <Typography variant="h4" fontWeight="bold">
                        {value}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                        {title}
                    </Typography>
                </Stack>
            </Stack>
        </Card>
    );
}
