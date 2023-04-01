import { User } from "@customTypes/users";
import getClient from "@utils/getClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(400).send("Only POST method is allowed for this route");
  } else {
    const user: User = JSON.parse(req.body);
    const client = await getClient();

    try {
      await client.query(`
        INSERT INTO users(user_id, user_name, avatar)
        VALUES (${user.userId}, '${user.userName}', '${user.avatar}')
        RETURNING *;
      `);
      res.status(204);
    } catch (e) {
      res.status(500).send("Error Occur performing transaction.");
    } finally {
      client.end();
    }
  }

  res.end();
}
