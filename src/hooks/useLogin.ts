import { useMutation } from "react-query";
import { User } from "@customTypes/users";
import { useEffect, useState } from "react";

const addUser = (user: User) =>
  fetch("/api/user", {
    method: "POST",
    body: JSON.stringify({
      ...user,
    }),
  });

export default function useLogin() {
  const [existingUser, setExistingUser] = useState<User | undefined>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { userId, userName, userAvatar } = window.localStorage;
      if (userId) {
        setExistingUser({
          userId: Number(userId),
          userName,
          avatar: userAvatar,
        });
      }
    }
  }, []);

  const query = useMutation((user: User) => addUser(user).then(() => user), {
    onSuccess: (user) => {
      window.localStorage.setItem("userId", user.userId.toString());
      window.localStorage.setItem("userName", user.userName);
      window.localStorage.setItem("userAvatar", user.avatar);
      setExistingUser(user);
    },
  });

  const logout = () => {
    window.localStorage.clear();
    window.location.reload();
  };
  return { existingUser, query, logout };
}
