import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import type { Socket as ClientSocket } from "socket.io-client";

export default function useSocket() {
  const [socket, setSocket] = useState<ClientSocket | undefined>();
  async function startSocket() {
    await fetch("/api/socket");
    const server = io();
    server.on("connect", () => {
      console.log("User connection to client acknowledged");
    });

    setSocket(server);
  }

  useEffect(() => {
    startSocket();
  }, []);

  return { socket };
}
