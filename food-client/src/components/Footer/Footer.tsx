"use client";

import { Stack, Container, Link } from "@mui/material";
import Image from "next/image";

export default function Footer() {
  return (
    <Stack width="100vw" sx={{ background: "#18BA51", position: "relative" }}>
      {/* <Box sx={{ height: "200%", background: "violet" }}> */}
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
          display="flex"
          direction="row"
          alignItems="center"
          justifyContent="center"
          gap={2}
          marginTop={5}
        >
          <Image alt="" src="pineconeWhite.svg" width={40} height={40} />
          <Stack sx={{ color: "white" }} fontSize={20} fontFamily={"inherit"}>
            Food Delivery
          </Stack>
        </Stack>
        <Stack
          display="flex"
          direction="row"
          gap={15}
          justifyContent="center"
          marginTop={8}
        >
          <Link sx={{ color: "white" }}>Нүүр</Link>
          <Link sx={{ color: "white" }}>Холбоо барих</Link>
          <Link sx={{ color: "white" }}>Хоолны цэс</Link>
          <Link sx={{ color: "white" }}>Үйлчилгээний нөхцөл</Link>
          <Link sx={{ color: "white" }}>Хүр гэлтийн бүс</Link>
          <Link sx={{ color: "white" }}>Нууцлалийн бодлого</Link>
        </Stack>
        <Stack
          direction="row"
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={5}
          marginTop={6}
          sx={{}}
          borderBottom={1}
          borderColor="white"
        >
          <Stack marginBottom={3}>
            <Link>
              <Image alt="" src="Facebook.svg" width={40} height={40} />
            </Link>
          </Stack>
          <Stack marginBottom={3}>
            <Link>
              <Image alt="" src="Instagram.svg" width={40} height={40} />
            </Link>
          </Stack>
          <Stack marginBottom={3}>
            <Link>
              <Image alt="" src="Twitter.svg" width={40} height={40} />
            </Link>
          </Stack>
        </Stack>
        <Stack justifyContent="center" alignItems="center" marginBottom={10}>
          <Stack sx={{ color: "white" }} marginTop={7}>
            © 2024 Pinecone Foods LLC{" "}
          </Stack>
          <Stack sx={{ color: "white" }} marginTop={2}>
            Зохиогчийн эрх хуулиар хамгаалагдсан.
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
}
