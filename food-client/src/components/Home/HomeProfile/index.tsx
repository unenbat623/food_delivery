"use client";

import { Container, Stack, Divider, Grid, Box } from "@mui/material";
import Image from "next/image";
import React from "react";

const HomeProfile = () => {
  return (
    <Stack
      width="100vw"
      height="40vw"
      sx={{ background: "#16a34a", position: "relative" }}
    >
      <Image
        alt=""
        src="footerIcon.svg"
        width={100}
        height={100}
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
          top: 0,
        }}
      />
      {/* </Box> */}
      <Container>
        <Stack
          display="grid"
          sx={{ position: "absolute" }}
          gap={2}
          marginTop={45}
        >
          <Stack
            sx={{ color: "white" }}
            fontSize={50}
            fontFamily={"inherit"}
            fontWeight={800}
          >
            Pinecone<span style={{ marginTop: -20 }}> Food delivery</span>
          </Stack>
          <Divider
            sx={{
              backgroundColor: "white",
              borderWidth: "1px",
              marginTop: 5,
              width: 350,
            }}
          />
          <Stack sx={{ color: "white" }} fontSize={20} fontFamily={"inherit"}>
            Horem ipsum dolor sit amet,
            <span> consectetur adipiscing elit.</span>
          </Stack>
        </Stack>
        <Stack
          display="flex"
          direction="row"
          gap={15}
          justifyContent="center"
          marginTop={8}
        >
          <Grid>
            <Box sx={{ position: "absolute", top: 10 }}>
              <Image alt="" src="/foodprofile.png" width={400} height={400} />
            </Box>
            <Box sx={{ position: "absolute", top: "3px" }}>
              <Image alt="" src="/food_profiled.png" width={200} height={200} />
            </Box>
          </Grid>
        </Stack>
      </Container>
    </Stack>
  );
};

export default HomeProfile;
