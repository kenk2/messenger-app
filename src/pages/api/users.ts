// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User } from "@customTypes/users";
import getClient from "@utils/getClient";
import toCamelCase from "@utils/toCamelCase";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[]>
) {
  const client = await getClient();
  const query = await client.query(`
    SELECT * from users;
  `);
  try {
    res.status(200).json(query.rows.map(toCamelCase));
  } catch (e) {
    res.status(500);
  } finally {
    client.end();
  }
  res.end();
}
