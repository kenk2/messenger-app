import UserOptions from "@components/messageDashboard/UserOptions";
import TestWrapper from "@components/TestWrapper";
import { User } from "@customTypes/users";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

const MOCK_USER: User = {
  userId: 1,
  userName: "Epic_Username_300",
  avatar: "",
};

const renderComponent = () =>
  render(
    <TestWrapper>
      <UserOptions user={MOCK_USER} />
    </TestWrapper>
  );

describe("UserOptions.tsx", () => {
  it("That the logout button appears when you click the user avatar button", async () => {
    renderComponent();
    expect(screen.queryByText("Logout")).not.toBeInTheDocument();
    const button = await screen.getByText(MOCK_USER.userName);

    await act(() => {
      button.click();
    });
    await screen.getByText("Logout");
  });
});
