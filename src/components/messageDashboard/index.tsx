import React from "react";
import {
  AppBar,
  Box,
  Button,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import useMessages from "@customHooks/useMessages";

import UserMessage from "./UserMessage";

export default function MessageDashboard() {
  const { messages } = useMessages();

  return (
    <Box marginBottom="75px">
      <AppBar position="sticky">
        <Toolbar>
          <Typography>Messenger App</Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ overflowX: "scroll", marginTop: "8px" }}>
        {messages.map((message) => (
          <UserMessage message={message} key={message.id} />
        ))}
      </Box>
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
        />
        <Button color="success" variant="contained" sx={{ marginLeft: "8px" }}>
          Submit
        </Button>
      </Box>
    </Box>
  );
}
