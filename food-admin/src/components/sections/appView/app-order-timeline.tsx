"use client";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { alpha, useTheme } from "@mui/material/styles";

import { fDateTime } from "@/utils/format-time";

import Label from "@/components/label";

// ----------------------------------------------------------------------

export default function AnalyticsOrderTimeline({
  title,
  subheader,
  list,
  ...other
}: any) {
  const theme = useTheme();

  return (
    <Card sx={{ borderRadius: 2, boxShadow: (theme as any).customShadows?.z8 }} {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 2 }} />

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: alpha((theme.palette.primary as any).lighter, 0.2) }}>
              <TableCell>Title</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((item: any, index: number) => (
              <TableRow
                key={item.id}
                hover
                sx={{
                  "&:nth-of-type(odd)": {
                    bgcolor: alpha(theme.palette.grey[500], 0.04),
                  },
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell>{item.title}</TableCell>
                <TableCell>{fDateTime(item.time)}</TableCell>
                <TableCell>
                  <Label
                    color={
                      (item.type === "order1" && "primary") ||
                      (item.type === "order2" && "success") ||
                      (item.type === "order3" && "info") ||
                      (item.type === "order4" && "warning") ||
                      "error"
                    }
                  >
                    {item.type}
                  </Label>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
