import { IMessage } from "@customTypes/messages";
import { User } from "@customTypes/users";
import { Box } from "@mui/material";

import UserMessage from "./UserMessage";

type IMessages = {
  messages: IMessage[];
  users: User[];
};

export default function Messages(props: IMessages) {
  const { users, messages } = props;

  return (
    <Box sx={{ overflowX: "scroll", marginTop: "8px" }}>
      {messages.map((message) => (
        <UserMessage
          message={message}
          user={users.find((u) => u.userId === message.userId)}
          key={message.messageId}
        />
      ))}
    </Box>
  );
}
