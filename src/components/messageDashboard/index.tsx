import React, { useMemo, useRef } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { faker } from "@faker-js/faker";

type IMessageDashboard = {
  date: Date;
};

type IMessage = {
  name: string;
  message: string;
  id: number;
};

export default function MessageDashboard({ date }: IMessageDashboard) {
  const messages: IMessage[] = useMemo(
    () =>
      new Array(5).fill(0).map(() => ({
        name: faker.internet.userName(),
        message: faker.lorem.sentences(),
        id: faker.datatype.number(),
      })),
    []
  );

  return (
    <Box marginBottom="75px">
      <AppBar position="sticky">
        <Toolbar>
          <Typography>Messenger App</Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ overflowX: "scroll" }} marginTop="8px">
        {messages.map((message) => (
          <Box
            key={message.id}
            marginBottom="8px"
            border="1px solid black"
            padding="8px"
          >
            <Avatar>{message.name}</Avatar>
            {message.message}
          </Box>
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
          margin="normal"
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
