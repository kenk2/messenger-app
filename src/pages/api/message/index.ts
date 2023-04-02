// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest } from "next";
import { NextSocketResponse, SOCKET_EVENTS } from "@customTypes/socket";
import { getClient, performTransaction } from "@utils/dbClient";
import toCamelCase from "@utils/toCamelCase";

export default async function handler(
  req: NextApiRequest,
  res: NextSocketResponse
) {
  const io = res.socket?.server?.io;
  if (req.method !== "POST") {
    res.status(400).send("Only POST method is allowed on this route.");
    res.end();
    return;
  }
  const client = await getClient();
  const { message } = JSON.parse(req.body);

  const queryString = `
    INSERT INTO messages(user_id, created_at, text)
    VALUES (${message.userId}, NOW(), '${message.text}')
    RETURNING *
  `;
  try {
    const query = await performTransaction(client, queryString);
    const payload = toCamelCase(query.rows[0]);
    res.status(201).json(payload);
    io?.sockets.emit(SOCKET_EVENTS.NEW_MESSAGE_UPDATE, payload);
  } catch (e) {
    res.status(500).send(`${e}`);
  } finally {
    res.end();
  }
}
