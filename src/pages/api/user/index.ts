import { NextSocketResponse, SOCKET_EVENTS } from "@customTypes/socket";
import { User } from "@customTypes/users";
import { getClient, performTransaction } from "@utils/dbClient";
import type { NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextSocketResponse
) {
  if (req.method !== "POST") {
    res.status(400).send("Only POST method is allowed for this route");
  } else {
    const io = res.socket?.server?.io;
    const user: User = JSON.parse(req.body);
    const client = await getClient();
    const queryString = `
      INSERT INTO users(user_id, user_name, avatar)
      VALUES (${user.userId}, '${user.userName}', '${user.avatar}');
    `;

    try {
      await performTransaction(client, queryString);
      res.status(204);
      io?.emit(SOCKET_EVENTS.NEW_USER);
    } catch (e) {
      res.status(500).send("Error Occur performing transaction.");
    } finally {
      res.end();
    }
  }
}
