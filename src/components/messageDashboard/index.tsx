import React from "react";
import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";

import useUsers from "@customHooks/useUser";
import useMessages from "@customHooks/useMessages";
import useSocket from "@customHooks/useSocket";
import { User } from "@customTypes/users";

import UserOptions from "./UserOptions";
import Messenger from "./Messenger";
import Messages from "./Messages";

type IMessageDashboard = {
  user: User;
};

export default function MessageDashboard(props: IMessageDashboard) {
  const { user } = props;
  const { socket } = useSocket();
  const { data: users } = useUsers(socket);
  const { messages } = useMessages(socket);

  if (!socket) {
    return (
      <Backdrop
        open
        sx={{ color: "white", display: "flex", flexDirection: "column" }}
      >
        <CircularProgress color="inherit" />
        <Typography>Connecting to the server. Please wait...</Typography>
      </Backdrop>
    );
  }

  return (
    <Box sx={{ marginBottom: "75px" }}>
      <UserOptions user={user} />
      {users ? <Messages users={users} messages={messages} /> : null}
      <Messenger user={user} />
    </Box>
  );
}
