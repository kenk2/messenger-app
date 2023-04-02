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
        setSocket(server);
      });

      server.on("reconnect", () => {
        // eslint-disable-next-line no-console
        console.log("User has reconnected to the server", () => {
          setSocket(server);
        });
      });

      server.on("connect_error", () => {
        console.log("User connection is encountering issues...");
        setSocket(undefined);
      });
    }
    startSocket();

    return () => {
      server.disconnect();
      // eslint-disable-next-line no-console
      console.log("User has disconnected from the server.");
      setSocket(undefined);
    };
  }, []);

  return { socket };
}
