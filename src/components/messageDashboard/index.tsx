import React, { useCallback, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

import useMessages from "@customHooks/useMessages";
import useSocket from "@customHooks/useSocket";
import { User } from "@customTypes/users";
import useUsers from "@customHooks/useUser";
import useLogin from "@customHooks/useLogin";

import UserMessage from "./UserMessage";

type IMessageDashboard = {
  user: User;
};

export default function MessageDashboard(props: IMessageDashboard) {
  const { user } = props;
  const { logout } = useLogin();

  const { socket } = useSocket();
  const {
    messages,
    mutate: { mutate: addMessage, isLoading: isAddingMessage },
  } = useMessages(socket);
  const { data: users } = useUsers();
  const [messageText, setMessageText] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [anchor, setAnchor] = useState<HTMLElement | undefined>();

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

  const handleMenu = (evt: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(evt.currentTarget);
    setMenuOpen(true);
  };

  const handleClose = () => {
    setAnchor(undefined);
    setMenuOpen(false);
  };

  return (
    <Box marginBottom="75px">
      <AppBar position="sticky">
        <Toolbar>
          <Typography>Messenger App</Typography>
          <IconButton
            sx={{ marginLeft: "auto", color: "white" }}
            onClick={handleMenu}
          >
            <Typography sx={{ marginRight: "8px" }}>{user.userName}</Typography>
            <Avatar src={user.avatar} />
          </IconButton>
        </Toolbar>
        <Menu open={menuOpen} anchorEl={anchor} onClose={handleClose}>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
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
          disabled={isAddingMessage}
          sx={{
            margin: 0,
            backgroundColor: "white",
          }}
          value={messageText}
          onChange={(evt) => setMessageText(evt.target.value)}
        />
        <LoadingButton
          color="success"
          variant="contained"
          sx={{ marginLeft: "8px" }}
          loading={isAddingMessage}
          onClick={handleSubmit}
          disabled={messageText.length === 0 || isAddingMessage}
        >
          Submit
        </LoadingButton>
      </Box>
    </Box>
  );
}
