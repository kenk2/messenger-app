import type { Socket as ClientSocket } from "socket.io-client";
import { User } from "@customTypes/users";
import { useQuery, useQueryClient } from "react-query";
import { SOCKET_EVENTS } from "@customTypes/socket";

const useUsers = (socket?: ClientSocket) => {
  const queryClient = useQueryClient();

  socket?.on(SOCKET_EVENTS.NEW_USER, () => {
    queryClient.invalidateQueries("get-users");
  });

  return useQuery<User[]>("get-users", () =>
    fetch("/api/user/users").then((result) => result.json())
  );
};

export default useUsers;
