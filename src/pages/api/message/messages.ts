import type { NextApiRequest, NextApiResponse } from "next";
import type { IMessage } from "@customTypes/messages";
import toCamelCase from "@utils/toCamelCase";
import { getClient, performTransaction } from "@utils/dbClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IMessage[] | string>
) {
  const client = await getClient();
  const { pageSize } = req.query;
  const queryCommand = `
    SELECT * FROM "messages"
    ORDER BY message_id DESC
    LIMIT(${pageSize});
    `;

  try {
    const selectQuery = await performTransaction(client, queryCommand);
    res.status(200).json(selectQuery.rows.map(toCamelCase));
  } catch (e) {
    res.status(500).send(`${e}`);
  } finally {
    res.end();
  }
}
