"use client";

import { Stack, Typography } from "@mui/material";
import { InProgress } from "../Inprogress/Inprogress";
import { Input } from "../core/Input/index";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { useState } from "react";
import Image from "next/image";

export const Address = () => {
  const [checkIcon, setCheckIcon] = useState(false);
  const [checkBox, setCheckBox] = useState(false);

  return (
    <Stack maxWidth={"432px"} width={"100%"} gap={"50px"}>
      <InProgress />

      <Stack
        padding={3}
        gap={5}
        maxWidth={"432px"}
        width={"100%"}
        borderRadius={2}
        border={1}
      >
        <Stack gap={2}>
          <Typography fontSize={14} fontWeight={400}>
            Хаяг аа оруулна уу
          </Typography>
          <Stack gap={2}>
            <Stack sx={{ display: "flex" }}>
              <Image alt="" src="location.svg" width={20} height={20} />
              <Input name="" label="Дүүрэг сонгоно уу" />
            </Stack>

            <Stack sx={{ display: "flex" }}>
              <Image alt="" src="location.svg" width={20} height={20} />
              <Input name="" label="Хороо сонгоно уу" />
            </Stack>
            <Stack sx={{ display: "flex" }}>
              <Image alt="" src="location.svg" width={20} height={20} />
              <Input name="" label="Байр, гудамж сонгоно уу" />
            </Stack>
          </Stack>
        </Stack>
        <Stack gap={4}>
          <Input name="Нэмэлт мэдээлэл" label="Орц, давхар, орцны код ..." />
          <Input name="Утасны дугаар*" label="Утасны дугаараа оруулна уу" />
          <Stack>
            <Typography fontSize={14} fontWeight={400}>
              Төлбөр төлөх{" "}
            </Typography>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Stack direction={"row"} alignItems={"center"} gap={"10px"}>
                <Stack
                  onClick={() => {
                    setCheckBox(!checkBox);
                  }}
                >
                  {(!checkBox && <CheckBoxOutlineBlankIcon />) ||
                    (checkBox && <CheckBoxIcon />)}
                </Stack>
                <Typography color="#8B8E95" fontSize={16} fontWeight={400}>
                  Бэлнээр
                </Typography>
              </Stack>

              <Stack direction={"row"} alignItems={"center"} spacing={"10px"}>
                <Stack
                  onClick={() => {
                    setCheckIcon(!checkIcon);
                  }}
                >
                  {(!checkIcon && <CheckBoxOutlineBlankIcon />) ||
                    (checkIcon && <CheckBoxIcon />)}
                </Stack>
                <Typography color="#8B8E95" fontSize={16} fontWeight={400}>
                  Картаар
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
