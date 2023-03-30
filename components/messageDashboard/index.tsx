import React from "react";
import { Box } from "@mui/material";

type IMessageDashboard = {
  date: Date;
};

export default function MessageDashboard({ date }: IMessageDashboard) {
  return <Box>{date.toDateString()}</Box>;
}
