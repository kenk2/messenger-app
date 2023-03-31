import MessageDashboard from "@components/messageDashboard";

export default function Home() {
  const newDate = new Date();
  return <MessageDashboard date={newDate} />;
}
