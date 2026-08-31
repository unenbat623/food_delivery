"use client";

import dynamic from "next/dynamic";
import React from "react";

const AppView = dynamic(() => import("@/components/sections/appView"), {
  ssr: false,
});

const DashboardPage = () => {
  return <AppView />;
};

export default DashboardPage;
