import type { NextApiRequest } from "next";
import { NextSocketResponse } from "@customTypes/socket";
import { Server } from "socket.io";

export default function handler(req: NextApiRequest, res: NextSocketResponse) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);

    io.on("connection", () => {
      console.log("A user has connected to the socket.");
    });
    res.socket.server.io = io;
  }
  res.end();
}
