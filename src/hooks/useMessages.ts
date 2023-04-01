import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import { IMessage } from "@customTypes/messages";

import type { Socket as ClientSocket } from "socket.io-client";
import { SOCKET_EVENTS } from "@customTypes/socket";
import { format } from "date-fns";

function getPastMessages(
  timestamp: Date,
  pageSize: number = 50
): Promise<IMessage[]> {
  const formattedDate = format(timestamp, "yyyy-MM-dd hh:mm:ss");
  return fetch(
    `/api/messages?pageSize=${pageSize}&timestamp=${formattedDate}`
  ).then((res) => res.json());
}

export default function useMessages(socket?: ClientSocket) {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    getPastMessages(new Date()).then((result) => {
      setMessages(result);
    });
  }, []);

  socket?.on(SOCKET_EVENTS.USER_MESSAGE_UPDATE, (payload: IMessage) => {
    setMessages([
      ...messages,
      {
        messageId: faker.datatype.number(),
        userName: faker.internet.userName(),
        userId: faker.datatype.number(),
        text: payload.text,
        createdAt: new Date(payload.createdAt),
      },
    ]);
  });

  return { messages };
}
