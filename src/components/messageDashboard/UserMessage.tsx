import { IMessage } from "@customTypes/messages";
import { Box, Avatar, Typography } from "@mui/material";
import React from "react";

type IUserMessage = {
  message: IMessage;
};

export default function Message(props: IUserMessage) {
  const {
    message: { text, name, timestamp },
  } = props;
  return (
    <Box marginBottom="8px" border="1px solid black" padding="8px">
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Avatar>{name}</Avatar>
        <Typography sx={{ marginLeft: "8px" }}>{name}</Typography>
        <Typography sx={{ marginLeft: "auto" }}>
          {timestamp.toLocaleString()}
        </Typography>
      </Box>
      {text}
    </Box>
  );
}
