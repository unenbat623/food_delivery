"use client";

import { useEffect, useState } from "react";
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    Stack,
    Select,
    MenuItem,
} from "@mui/material";
import instanceAxios from "@/utils/axios";
import { toast } from "react-toastify";

export default function OrderView() {
    const [orders, setOrders] = useState([]);

    const getOrders = async () => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await instanceAxios.get("/order", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setOrders(data.orders || []);
        } catch (error: any) {
            toast.error("Захиалга татахад алдаа гарлаа");
        }
    };

    const changeStatus = async (orderId: string, status: string) => {
        try {
            const token = localStorage.getItem("token");
            await instanceAxios.put(`/order/${orderId}`, { status }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Захиалгын төлөв өөрчлөгдлөө");
            getOrders();
        } catch (error) {
            toast.error("Төлөв өөрчлөхөд алдаа гарлаа");
        }
    };

    const statusColor = (status: string) => {
        switch (status) {
            case "Delivered": return { color: "success.main", borderColor: "success.main" };
            case "Progressing": return { color: "info.main", borderColor: "info.main" };
            case "Cancelled": return { color: "error.main", borderColor: "error.main" };
            default: return { color: "warning.main", borderColor: "warning.main" };
        }
    };

    useEffect(() => {
        getOrders();
    }, []);

    return (
        <Container>
            <Typography variant="h4" sx={{ mb: 5 }}>
                Захиалгын жагсаалт
            </Typography>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Order No</TableCell>
                            <TableCell>User</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order: any, index) => (
                            <TableRow
                                key={index}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {order.orderNo}
                                </TableCell>
                                <TableCell>{order.user?.name}</TableCell>
                                <TableCell>{order.user?.email}</TableCell>
                                <TableCell>{order.payment?.paymentAmount}₮</TableCell>
                                <TableCell>
                                    <Select
                                        value={order.delivery?.status || "Pending"}
                                        onChange={(e) => changeStatus(order._id, e.target.value)}
                                        size="small"
                                        sx={{
                                            ...statusColor(order.delivery?.status || "Pending"),
                                            fontWeight: "bold",
                                            borderRadius: 2,
                                        }}
                                    >
                                        <MenuItem value="Pending">Pending</MenuItem>
                                        <MenuItem value="Progressing">Progressing</MenuItem>
                                        <MenuItem value="Delivered">Delivered</MenuItem>
                                        <MenuItem value="Cancelled">Cancelled</MenuItem>
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : ""}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}
