"use client";

import React, {
  useState,
  PropsWithChildren,
  useContext,
  useEffect,
} from "react";

import Header from "@/layout/Header";
import { Box } from "@mui/material";
import Nav from "@/layout/nav";
import Main from "@/layout/main";
import { AuthContext } from "@/providers";
import { useRouter } from "next/navigation";

const Layout = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [openNav, setOpenNav] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, []);

  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} />
      <Box
        sx={{
          minHeight: 1,
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        <Main>{children}</Main>
      </Box>
    </>
  );
};

export default Layout;
