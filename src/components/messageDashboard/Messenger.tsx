import React, { useState, useCallback } from "react";
import useMessages from "@customHooks/useMessages";
import { LoadingButton } from "@mui/lab";
import { Box, TextField } from "@mui/material";
import { User } from "@customTypes/users";

type IMessenger = {
  user: User;
};

export default function Messenger(props: IMessenger) {
  const { user } = props;
  const [messageText, setMessageText] = useState<string>("");
  const {
    mutate: { mutate: addMessage, isLoading: isAddingMessage },
  } = useMessages();

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
  );
}
