import Messages from "@components/messageDashboard/Messages";
import { IMessage } from "@customTypes/messages";
import { User } from "@customTypes/users";
import { render, screen } from "@testing-library/react";

const MOCK_USERS: User[] = [
  {
    userId: 1,
    userName: "test1",
    avatar: "",
  },
  {
    userId: 2,
    userName: "test2",
    avatar: "",
  },
];

const MOCK_MESSAGES: IMessage[] = [
  {
    userId: 101,
    text: "This post belongs to an unkown user",
    messageId: 99,
    createdAt: new Date(),
  },
  {
    userId: 100,
    text: "This post belongs to an unknown user as well",
    messageId: 100,
    createdAt: new Date(),
  },
  {
    userId: 2,
    text: "This post belongs to a valid user",
    messageId: 101,
    createdAt: new Date(),
  },
  {
    userId: 1,
    text: "This post belongs to valid user as well",
    messageId: 102,
    createdAt: new Date(),
  },
];

const renderComponent = () =>
  render(<Messages users={MOCK_USERS} messages={MOCK_MESSAGES} />);

describe("Messages.tsx", () => {
  it("tests that the correct number of users are unknown usernames", async () => {
    renderComponent();

    expect(await screen.findAllByText("Unknown User")).toHaveLength(2);

    await screen.getByText("test1");
    await screen.getByText("test2");
  });
});
