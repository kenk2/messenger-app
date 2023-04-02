import { useEffect, useState } from "react";
import { IAddMessage, IMessage } from "@customTypes/messages";

import type { Socket as ClientSocket } from "socket.io-client";
import { SOCKET_EVENTS } from "@customTypes/socket";
import { useMutation } from "react-query";
import unescape from "lodash/unescape";

function getPastMessages(pageSize: number = 50): Promise<IMessage[]> {
  return fetch(`/api/message/messages?pageSize=${pageSize}`)
    .then((res) => res.json())
    .then((res) =>
      res.reverse().map((m: IMessage) => ({
        ...m,
        text: unescape(m.text),
      }))
    );
}

function addMessage(message: IAddMessage): Promise<IMessage> {
  return fetch("/api/message", {
    method: "POST",
    body: JSON.stringify({
      message,
    }),
  }).then((res) => res.json());
}

export default function useMessages(socket?: ClientSocket) {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    getPastMessages().then((result) => {
      setMessages(result);
    });
  }, []);

  socket?.on(SOCKET_EVENTS.NEW_MESSAGE_UPDATE, (payload: IMessage) => {
    setMessages([
      ...messages,
      {
        ...payload,
        text: unescape(payload.text),
        createdAt: new Date(payload.createdAt),
      },
    ]);
  });

  const mutate = useMutation("post-message", addMessage);

  return { messages, mutate };
}
