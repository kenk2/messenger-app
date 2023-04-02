import { Client } from "pg";

export async function getClient() {
  const client = new Client(process.env.DATABASE_URL);
  await client.connect();
  return client;
}

export async function performTransaction(client: Client, query: string) {
  try {
    const clientQuery = await client.query(query);
    return clientQuery;
  } catch (e) {
    throw new Error(`${e}`);
  } finally {
    client.end();
  }
}
