import UserMessage from "@components/messageDashboard/UserMessage";
import type { IMessage } from "@customTypes/messages";
import type { User } from "@customTypes/users";
import { render, screen } from "@testing-library/react";

const MOCK_USER: User = {
  userId: 1,
  userName: "Epic_Username_300",
  avatar: "The Last Airbender",
};

const MOCK_MESSAGE: IMessage = {
  userId: 1,
  messageId: 300,
  text: "This is some awesome text!",
  createdAt: new Date(),
};

const renderComponent = (message: IMessage, user?: User) =>
  render(<UserMessage user={user} message={message} />);

describe("UserMessage.tsx", () => {
  it("Tests a message that has an associated user", async () => {
    renderComponent(MOCK_MESSAGE, MOCK_USER);
    await screen.getByText(MOCK_USER.userName);
    await screen.getByText(MOCK_MESSAGE.text);
  });

  it("Tests a message that does not have an associated user", async () => {
    renderComponent(MOCK_MESSAGE);
    expect(screen.queryByText(MOCK_USER.userName)).not.toBeInTheDocument();
    await screen.getByText("Unknown User");
  });
});
