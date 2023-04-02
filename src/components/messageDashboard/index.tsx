import React, { useCallback, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";

import useMessages from "@customHooks/useMessages";
import useSocket from "@customHooks/useSocket";
import { User } from "@customTypes/users";
import useUsers from "@customHooks/useUser";

import UserMessage from "./UserMessage";

type IMessageDashboard = {
  user: User;
};

export default function MessageDashboard(props: IMessageDashboard) {
  const { user } = props;

  const { socket } = useSocket();
  const {
    messages,
    mutate: { mutate: addMessage },
  } = useMessages(socket);
  const { data: users } = useUsers();
  const [messageText, setMessageText] = useState<string>("");

  const handleSubmit = useCallback(
    async (evt: React.FormEvent<HTMLButtonElement>) => {
      evt.preventDefault();
      await addMessage({
        userId: user.userId,
        text: messageText,
      });
      setMessageText("");
    },
    [messageText, user, addMessage]
  );

  return (
    <Box marginBottom="75px">
      <AppBar position="sticky">
        <Toolbar>
          <Typography>Messenger App</Typography>
        </Toolbar>
      </AppBar>
      {users && (
        <Box sx={{ overflowX: "scroll", marginTop: "8px" }}>
          {messages.map((message) => (
            <UserMessage
              message={message}
              user={users.find((u) => u.userId === message.userId)!}
              key={message.messageId}
            />
          ))}
        </Box>
      )}
      <Box
        sx={{
          height: "40px",
          display: "flex",
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "16px",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#999",
        }}
      >
        <TextField
          placeholder="Enter a message..."
          multiline
          fullWidth
          color="primary"
          sx={{
            margin: 0,
            backgroundColor: "white",
          }}
          value={messageText}
          onChange={(evt) => setMessageText(evt.target.value)}
        />
        <Button
          color="success"
          variant="contained"
          sx={{ marginLeft: "8px" }}
          onClick={handleSubmit}
          disabled={messageText.length === 0}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
