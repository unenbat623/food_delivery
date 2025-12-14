"use client";

import { useContext, useEffect, useState } from "react";
import {
    Container,
    Grid,
    Typography,
    Box,
    Stack,
    Chip,
} from "@mui/material";
import StatsCard from "@/components/shared/StatsCard";
import ModernTable from "@/components/shared/ModernTable";
import { UserContext } from "@/context/UserProvider";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";

export default function UserDashboard() {
    const { user } = useContext(UserContext);
    const [orders, setOrders] = useState([]);

    // Mock data - replace with actual API calls
    const stats = {
        totalOrders: user?.orders?.length || 0,
        favorites: 5,
        profile: user?.name || "Guest",
    };

    const orderColumns = [
        { id: "id", label: "Order #", minWidth: 100 },
        { id: "date", label: "Date", minWidth: 150 },
        { id: "amount", label: "Amount", minWidth: 100 },
        { id: "status", label: "Status", minWidth: 120 },
    ];

    const orderRows = user?.orders?.map((order: any, index: number) => ({
        id: `#${1000 + index}`,
        date: new Date(order.createdAt).toLocaleDateString(),
        amount: `${order.payment?.paymentAmount || 0}₮`,
        status: order.payment?.paymentStatus || "Pending",
    })) || [];

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
                Welcome back, {user?.name || "Guest"}! 👋
            </Typography>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={4}>
                    <StatsCard
                        title="Total Orders"
                        value={stats.totalOrders}
                        icon={<ShoppingBagIcon sx={{ fontSize: 32, color: "white" }} />}
                        color="primary"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <StatsCard
                        title="Favorites"
                        value={stats.favorites}
                        icon={<FavoriteIcon sx={{ fontSize: 32, color: "white" }} />}
                        color="primary"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <StatsCard
                        title="Profile"
                        value={stats.profile}
                        icon={<PersonIcon sx={{ fontSize: 32, color: "white" }} />}
                        color="primary"
                    />
                </Grid>
            </Grid>

            {/* Order History */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                    Order History
                </Typography>
                {orderRows.length > 0 ? (
                    <ModernTable columns={orderColumns} rows={orderRows} />
                ) : (
                    <Typography variant="body1" color="text.secondary">
                        No orders yet. Start ordering to see your history here!
                    </Typography>
                )}
            </Box>
        </Container>
    );
}
