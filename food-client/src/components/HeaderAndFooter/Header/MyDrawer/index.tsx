"use client";

import * as React from "react";
import {
  Box,
  Button as MuiButton,
  Typography,
  Grid,
  Divider,
  Stack,
  Button,
} from "@mui/material";
import { Remove, Add, Close } from "@mui/icons-material";
import Link from "next/link";
import instanceAxios from "@/utils/axios";

// NOTE: This is a mock/placeholder component with hardcoded data
// TODO: Connect to real basket data from BasketProvider

const style = {
  width: 538,
  borderRadius: 5,
};

const backgroundImageStyle = {
  backgroundImage: 'url("/assets/food-1.jpg")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  width: "245px",
  height: "150px",
};

export const DrawerCard = () => {
  const [count, setCount] = React.useState(1);
  const [sum, setSum] = React.useState(0);

  // Commented out - placeholder endpoint not implemented
  // React.useEffect(() => {
  //   const fetchSumData = async () => {
  //     try {
  //       const response = await instanceAxios.get("your-api-endpoint");
  //       setSum(response.data.sum);
  //     } catch (error) {
  //       console.error("Error fetching sum data:", error);
  //     }
  //   };
  //   fetchSumData();
  // }, []);


  const handleCount = (operation: string) => {
    if (operation === "zero") {
      setCount(count + 0);
    } else if (operation === "add") {
      setCount(count + 1);
    } else if (operation === "min") {
      if (count === 0) {
        setCount(0);
      } else {
        setCount(count - 1);
      }
    }
  };

  return (
    <>
      <Box sx={style} m={5}>
        <Grid container display={"flex"} flexDirection={"row"} gap={10}>
          <Grid item xs={5} style={backgroundImageStyle}></Grid>
          <Grid
            item
            xs={5}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"flex-start"}
          >
            <Grid item xs={1} position={"relative"}>
              <MuiButton sx={{ ml: 50, position: "absolute" }}>
                <Close />
              </MuiButton>
            </Grid>
            <Grid display={"flex"} flexDirection={"column"}>
              <Typography fontWeight={600}>Bowl</Typography>
              <Typography sx={{ color: "#18BA51" }} fontWeight={600}>
                18,800
              </Typography>

              <Typography color={"gray"}>
                Өндөг, шош, улаан лооль, өргөст хэмт, байцаа, салмон.
              </Typography>

              <div>
                <MuiButton onClick={() => handleCount("min")}>
                  <Remove
                    sx={{
                      bgcolor: "#18BA51",
                      color: "white",
                      width: "70%",
                      height: "30px",
                      borderRadius: 2,
                    }}
                  />
                </MuiButton>
                <input
                  type="text"
                  value={count}
                  style={{
                    width: "60px",
                    border: "none",
                    textAlign: "center",
                    paddingTop: 4,
                    paddingBottom: 4,
                    fontWeight: 600,
                    fontSize: 16,
                  }}
                />
                <MuiButton onClick={() => handleCount("add")}>
                  <Add
                    sx={{
                      bgcolor: "#18BA51",
                      color: "white",
                      width: "70%",
                      height: "30px",
                      borderRadius: 2,
                    }}
                  />
                </MuiButton>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Stack
          direction={"row"}
          alignItems={"center"}
          bottom={10}
          marginRight={5}
          position={"absolute"}
        >
          <Stack width={"50%"}>
            <Typography color={"#5E6166"} fontSize={18} fontWeight={400}>
              Нийт төлөх дүн
            </Typography>
            <Typography color={"#121316"} fontSize={18} fontWeight={700}>
              34,800₮
            </Typography>
          </Stack>
          <Stack width={"50%"}>
            <Link href={"/order"}>
              <Button
                fullWidth
                variant="contained"
                disableElevation
                sx={{
                  py: "14.5px",
                  bgcolor: "#18BA51",
                  marginRight: 85,
                }}
              >
                Захиалах
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Box>
      <Divider />
    </>
  );
};
