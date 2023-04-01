import { Server } from "socket.io";
import { Socket as NetSocket } from "net";
import type { Server as IOServer } from "socket.io";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Server as HTTPServer } from "http";
import { SOCKET_EVENTS } from "@customTypes/socket";

type NextSocketResponse = {
  socket: {
    server: {
      io?: IOServer;
    } & HTTPServer;
  } & NetSocket;
} & NextApiResponse;

export default function handler(req: NextApiRequest, res: NextSocketResponse) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);

    io.on("connection", (socket) => {
      console.log("A user has connected to the server");
      socket.on(SOCKET_EVENTS.USER_MESSAGE, (message) => {
        io.emit(SOCKET_EVENTS.USER_MESSAGE_UPDATE, { message });
      });
    });

    res.socket.server.io = io;
  }

  res.end();
}
