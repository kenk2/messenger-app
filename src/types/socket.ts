import { Socket as NetSocket } from "net";
import type { Server as IOServer } from "socket.io";
import type { Server as HTTPServer } from "http";
import type { NextApiResponse } from "next/types";

export const SOCKET_EVENTS: Record<string, string> = {
  USER_MESSAGE: "user message",
  NEW_MESSAGE_UPDATE: "new message update",
};

export type NextSocketResponse = {
  socket: {
    server: {
      io?: IOServer;
    } & HTTPServer;
  } & NetSocket;
} & NextApiResponse;
