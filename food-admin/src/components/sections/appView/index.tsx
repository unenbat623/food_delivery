/* eslint-disable @next/next/no-img-element */
"use client";
import { faker } from "@faker-js/faker";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import Iconify from "@/components/iconify";

import AppTasks from "./app-tasks";
import AppNewsUpdate from "./app-news-update";
import AppOrderTimeline from "./app-order-timeline";
import AppCurrentVisits from "./app-current-visits";
import AppWebsiteVisits from "./app-website-visits";
import AppWidgetSummary from "./app-widget-summary";
import AppTrafficBySite from "./app-traffic-by-site";
import AppCurrentSubject from "./app-current-subject";
import AppConversionRates from "./app-conversion-rates";
import { useContext, useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { AuthContext } from "@/providers/AuthProvider";
import { useAuthUser } from "@/hooks/auth/useAuth";
import Link from "next/link";
import instanceAxios from "@/utils/axios";

// ----------------------------------------------------------------------

export default function AppView() {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalUsers: 0,
    totalOrders: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await instanceAxios.get("/dashboard");
        setStats(response.data.stats);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5, fontWeight: "bold", color: "text.primary" }}>
        Сайн уу, Тавтай морил - {user?.name} 👋
      </Typography>

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
            title="Нийт хэрэглэгчид"
            total={stats.totalUsers}
            color="primary" // Keeping consistent green/primary theme
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Нийт захиалга"
            total={stats.totalOrders}
            color="warning" // Warning for orders might be okay, or change to primary
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Хүлээгдэж буй"
            total={234}
            color="error" // Error/Red for pending/action needed is good
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

        {/* Quick Actions */}
        <Grid xs={12}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            Admin Actions
          </Typography>
          <Grid container spacing={2}>
            <Grid>
              <Link href="/food" style={{ textDecoration: 'none' }}>
                <button style={{ padding: '10px 20px', borderRadius: '8px', background: '#16a34a', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                  + Add Food
                </button>
              </Link>
            </Grid>
            <Grid>
              <Link href="/category" style={{ textDecoration: 'none' }}>
                <button style={{ padding: '10px 20px', borderRadius: '8px', background: '#16a34a', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                  + Add Category
                </button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid xs={12} md={8}>
        <AppWebsiteVisits
          title="Борлуулалтын график"
          subheader="(+43%) өнгөрсөн жилээс"
          chart={{
            labels: [
              "01/01/2024", "02/01/2024", "03/01/2024", "04/01/2024",
              "05/01/2024", "06/01/2024", "07/01/2024", "08/01/2024",
              "09/01/2024", "10/01/2024", "11/01/2024"
            ],
            series: [
              {
                name: "Орлого",
                type: "area",
                fill: "gradient",
                data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
              },
            ],
          }}
        />
      </Grid>

      <Grid xs={12} md={4}>
        <AppCurrentVisits
          title="Хоолны төрөл"
          chart={{
            series: [
              { label: "Махан", value: 4344 },
              { label: "Үндсэн", value: 5435 },
              { label: "Зууш", value: 1443 },
              { label: "Цагаан хоол", value: 4443 },
            ],
          }}
        />
      </Grid>

      {/* Recent Orders Timeline */}
      <Grid xs={12}>
        <AppOrderTimeline
          title="Сүүлийн захиалгууд"
          list={[...Array(5)].map((_, index) => ({
            id: faker.string.uuid(),
            title: [
              "Захиалга #1983, 42,000₮",
              "Захиалга #1984, 12,500₮",
              "Захиалга #1985 амжилттай хүргэгдлээ",
              "Шинэ захиалга #XF-2356",
              "Шинэ захиалга #XF-2346",
            ][index],
            type: `order${index + 1}`,
            time: faker.date.recent(),
          }))}
        />
      </Grid>
    </Grid>
    </Container >
  );
}
