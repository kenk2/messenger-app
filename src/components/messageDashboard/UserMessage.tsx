import { User } from "@customTypes/users";
import { IMessage } from "@customTypes/messages";
import { Box, Avatar, Typography } from "@mui/material";
import React from "react";

type IUserMessage = {
  message: IMessage;
  user: User;
};

export default function UserMessage(props: IUserMessage) {
  const {
    message: { text, createdAt },
    user,
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
        <Avatar src={user.avatar} />
        <Typography sx={{ marginLeft: "8px" }}>{user.userName}</Typography>
        <Typography sx={{ marginLeft: "auto" }}>
          {new Date(createdAt).toLocaleString()}
        </Typography>
      </Box>
      {text}
    </Box>
  );
}
