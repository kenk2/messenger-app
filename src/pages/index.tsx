import { useState } from "react";
import LoginScreen from "@components/loginScreen";
import MessageDashboard from "@components/messageDashboard";
import { User } from "@customTypes/users";

export default function Home() {
  const [user, setUser] = useState<User | undefined>();
  if (user) {
    return <MessageDashboard user={user} />;
  }
  return <LoginScreen onLogin={(newUser) => setUser(newUser)} />;
}
