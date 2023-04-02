import { User } from "@customTypes/users";
import { useQuery } from "react-query";

const useUsers = () =>
  useQuery<User[]>("get-users", () =>
    fetch("/api/user/users").then((result) => result.json())
  );

export default useUsers;
