import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import type { Socket as ClientSocket } from "socket.io-client";

export default function useSocket() {
  const [socket, setSocket] = useState<ClientSocket | undefined>();

  useEffect(() => {
    const server = io();
    async function startSocket() {
      await fetch("/api/socket");
      server.on("connect", () => {
        // eslint-disable-next-line no-console
        console.log("User connection to client acknowledged");
      });
      setSocket(server);
    }
    startSocket();

    return () => {
      server.disconnect();
    };
  }, []);

  return { socket };
}
