import type { NextApiRequest, NextApiResponse } from "next";
import type { IMessage } from "@customTypes/messages";
import { Client } from "pg";
import toCamelCase from "@utils/toCamelCase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IMessage[]>
) {
  const { pageSize, timestamp } = req.query;
  const client = new Client(process.env.DATABASE_URL);
  const queryCommand = `
    SELECT * FROM messages
    WHERE created_at < '${timestamp}'
    LIMIT(${pageSize});
    `;

  await client.connect();

  try {
    const selectQuery = await client.query(queryCommand);
    res.status(200).json(selectQuery.rows.map(toCamelCase));
  } catch (e) {
    res.status(500);
  } finally {
    await client.end();
  }
  res.end();
}
