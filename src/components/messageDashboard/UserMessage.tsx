import { IMessage } from "@customTypes/messages";
import { Box, Avatar, Typography } from "@mui/material";
import React from "react";

type IUserMessage = {
  message: IMessage;
};

export default function UserMessage(props: IUserMessage) {
  const {
    message: { text, userName, createdAt },
  } = props;
  return (
    <Box
      sx={{ marginBottom: "8px", border: "1px solid black", padding: "8px" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Avatar>{userName}</Avatar>
        <Typography sx={{ marginLeft: "8px" }}>{userName}</Typography>
        <Typography sx={{ marginLeft: "auto" }}>
          {new Date(createdAt).toLocaleString()}
        </Typography>
      </Box>
      {text}
    </Box>
  );
}
