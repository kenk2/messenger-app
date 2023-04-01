import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import { IMessage } from "@customTypes/messages";

import type { Socket as ClientSocket } from "socket.io-client";
import { SOCKET_EVENTS } from "@customTypes/socket";

export default function useMessages(socket?: ClientSocket) {
  const [messages, setMessages] = useState<IMessage[]>([]);
  useEffect(() => {
    const newMessages: IMessage[] = new Array(5).fill(0).map(() => ({
      name: faker.internet.userName(),
      text: faker.lorem.sentences(),
      id: faker.datatype.number(),
      timestamp: faker.date.past(),
    }));

    setMessages(newMessages);
  }, []);

  socket?.on(SOCKET_EVENTS.USER_MESSAGE_UPDATE, (payload) => {
    setMessages([
      ...messages,
      {
        name: faker.internet.userName(),
        id: faker.datatype.number(),
        text: payload.message,
        timestamp: new Date(),
      },
    ]);
  });

  return { messages };
}
