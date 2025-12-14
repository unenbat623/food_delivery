"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    alpha,
    useTheme,
} from "@mui/material";

interface Column {
    id: string;
    label: string;
    minWidth?: number;
}

interface ModernTableProps {
    columns: Column[];
    rows: any[];
    onRowClick?: (row: any) => void;
}

export default function ModernTable({
    columns,
    rows,
    onRowClick,
}: ModernTableProps) {
    const theme = useTheme();

    return (
        <TableContainer
            component={Paper}
            sx={{
                borderRadius: 2,
                boxShadow: "0px 10px 40px -10px rgba(0,0,0,0.08)",
            }}
        >
            <Table>
                <TableHead>
                    <TableRow
                        sx={{
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                        }}
                    >
                        {columns.map((column) => (
                            <TableCell
                                key={column.id}
                                style={{ minWidth: column.minWidth }}
                                sx={{ fontWeight: "bold" }}
                            >
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow
                            key={index}
                            hover
                            onClick={() => onRowClick?.(row)}
                            sx={{
                                "&:nth-of-type(odd)": {
                                    bgcolor: alpha(theme.palette.grey[500], 0.04),
                                },
                                "&:last-child td, &:last-child th": { border: 0 },
                                cursor: onRowClick ? "pointer" : "default",
                            }}
                        >
                            {columns.map((column) => (
                                <TableCell key={column.id}>{row[column.id]}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
