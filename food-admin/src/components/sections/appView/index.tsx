"use client";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import AppOrderTimeline from "./app-order-timeline";
import AppCurrentVisits from "./app-current-visits";
import AppWebsiteVisits from "./app-website-visits";
import AppWidgetSummary from "./app-widget-summary";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import Link from "next/link";
import instanceAxios from "@/utils/axios";
import Iconify from "@/components/iconify";

export default function AppView() {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalRevenue: 2450000,
    totalUsers: 148,
    totalOrders: 324,
    totalFoods: 17,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await instanceAxios.get("/dashboard");
        if (response.data?.stats) {
          setStats(response.data.stats);
        }
      } catch (error) {
        console.warn("Using dashboard stats:", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <Container maxWidth="xl">
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: "text.primary" }}>
            Сайн уу, {user?.name || "Админ"}! 👋
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Өнөөдрийн байдлаарх рестораны нийт үзүүлэлт болон борлуулалтын тойм
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5}>
          <Button
            component={Link}
            href="/food"
            variant="contained"
            color="primary"
            startIcon={<Iconify icon="eva:plus-fill" />}
            sx={{ borderRadius: 2, fontWeight: 700 }}
          >
            Хоол нэмэх
          </Button>

          <Button
            component={Link}
            href="/category"
            variant="outlined"
            color="inherit"
            startIcon={<Iconify icon="eva:folder-add-fill" />}
            sx={{ borderRadius: 2, fontWeight: 700 }}
          >
            Ангилал нэмэх
          </Button>
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {/* Statistics Cards */}
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Нийт орлого"
            total={stats.totalRevenue}
            color="primary"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Бүртгэлтэй хэрэглэгчид"
            total={stats.totalUsers}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Нийт захиалга"
            total={stats.totalOrders}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Нийт хоолны төрөл"
            total={stats.totalFoods}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

        {/* Charts Section */}
        <Grid xs={12} md={8}>
          <AppWebsiteVisits
            title="Борлуулалтын өсөлтийн график"
            subheader="Сүүлийн 12 сарын захиалгын орлогын хөдөлгөөн (₮)"
            chart={{
              labels: [
                "01/01/2024",
                "02/01/2024",
                "03/01/2024",
                "04/01/2024",
                "05/01/2024",
                "06/01/2024",
                "07/01/2024",
                "08/01/2024",
                "09/01/2024",
                "10/01/2024",
                "11/01/2024",
                "12/01/2024",
              ],
              series: [
                {
                  name: "Нийт орлого",
                  type: "area",
                  fill: "gradient",
                  data: [140000, 255000, 310000, 467000, 520000, 643000, 720000, 840000, 956000, 1120000, 1430000, 1850000],
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <AppCurrentVisits
            title="Хоолны борлуулалтын хувь"
            chart={{
              series: [
                { label: "Үндсэн хоол", value: 45 },
                { label: "Пицца & Бургер", value: 25 },
                { label: "Салат & Шөл", value: 18 },
                { label: "Амттан & Уух зүйлс", value: 12 },
              ],
            }}
          />
        </Grid>

        {/* Recent Orders Timeline */}
        <Grid xs={12}>
          <AppOrderTimeline
            title="Сүүлийн захиалгын явц"
            list={[
              {
                id: "ord-1",
                title: "Захиалга #ORD-9842 (Б. Бат-Эрдэнэ) — 58,000₮ [Хүргэгдсэн]",
                type: "order1",
                time: new Date(Date.now() - 3600000 * 2),
              },
              {
                id: "ord-2",
                title: "Захиалга #ORD-9843 (М. Анужин) — 34,500₮ [Хүргэлтэнд]",
                type: "order2",
                time: new Date(Date.now() - 3600000 * 5),
              },
              {
                id: "ord-3",
                title: "Захиалга #ORD-9844 (Т. Тэмүүлэн) — 92,000₮ [Хүлээгдэж буй]",
                type: "order3",
                time: new Date(Date.now() - 3600000 * 12),
              },
              {
                id: "ord-4",
                title: "Захиалга #ORD-9845 (Г. Солонго) — 46,000₮ [Хүлээгдэж буй]",
                type: "order4",
                time: new Date(Date.now() - 3600000 * 24),
              },
            ]}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
