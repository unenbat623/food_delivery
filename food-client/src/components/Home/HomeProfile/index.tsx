"use client";

import { Container, Stack, Divider, Grid, Box } from "@mui/material";
import Image from "next/image";
import React from "react";

const HomeProfile = () => {
  return (
    <Stack
      width="100vw"
      height="40vw"
      sx={{ background: "#18BA51", position: "relative" }}
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
        <Stack display="grid" sx={{}} gap={2} marginTop={5}>
          <Stack
            sx={{ color: "white" }}
            fontSize={20}
            fontFamily={"inherit"}
            fontWeight={600}
          >
            Pinecone Food delivery
          </Stack>
          <Divider sx={{ backgroundColor: "white", borderWidth: "1px" }} />
          <Stack sx={{ color: "white" }} fontSize={20} fontFamily={"inherit"}>
            Horem ipsum dolor sit amet, consectetur adipiscing elit.
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
            <Box sx={{ position: "absolute" }}>
              <Image alt="" src="/foodprofile.png" width={600} height={600} />
            </Box>
            <Box sx={{ position: "absolute", pl: 70, pt: 35 }}>
              <Image alt="" src="/food_profiled.png" width={300} height={300} />
            </Box>
          </Grid>
        </Stack>
      </Container>
    </Stack>
  );
};

export default HomeProfile;
