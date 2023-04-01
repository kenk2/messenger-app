import { Server } from "socket.io";
import { Socket as NetSocket } from "net";
import type { Server as IOServer } from "socket.io";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Server as HTTPServer } from "http";
import { SOCKET_EVENTS } from "@customTypes/socket";
import { IMessage } from "@customTypes/messages";
import getClient from "@utils/getClient";
import toCamelCase from "@utils/toCamelCase";

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

      socket.on(SOCKET_EVENTS.USER_MESSAGE, async (payload) => {
        const client = await getClient();
        try {
          const query = await client.query(`
            INSERT INTO messages(user_id, created_at, text)
            VALUES (${payload.userId}, NOW(), '${payload.text}')
            RETURNING *
          `);

          const result: IMessage = toCamelCase(query.rows[0]);
          io.emit(SOCKET_EVENTS.USER_MESSAGE_UPDATE, result);
        } catch (e) {
          io.emit(SOCKET_EVENTS.SOCKET_ERROR, {
            errorText: `Had a problem with the transaction: ${e}`,
          });
        } finally {
          client.end();
        }
      });
    });

    res.socket.server.io = io;
  }

  res.end();
}
