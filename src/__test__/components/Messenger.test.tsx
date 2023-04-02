import Messenger from "@components/messageDashboard/Messenger";
import TestWrapper from "@components/TestWrapper";
import { User } from "@customTypes/users";
import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

const MOCK_USER: User = {
  userId: 1,
  userName: "Epic_Username",
  avatar: "",
};

const renderComponent = () =>
  render(
    <TestWrapper>
      <Messenger user={MOCK_USER} />
    </TestWrapper>
  );

describe("Messenger.test.tsx", () => {
  it("Tests that the submit button is disabled when the component is initialized", async () => {
    renderComponent();
    const submitButton = await screen.getByText("Submit");
    expect(submitButton).toBeDisabled();
  });

  it("Tests that the submit button is enabled when the textbox has a message", async () => {
    renderComponent();
    const textBox = await screen.getByPlaceholderText("Enter a message...");
    const submitButton = await screen.getByText("Submit");
    expect(submitButton).toBeDisabled();

    await act(async () => {
      userEvent.click(textBox);
      await userEvent.type(textBox, "I am awesome text!");
    });

    expect(textBox).toHaveValue("I am awesome text!");
    expect(submitButton).not.toBeDisabled();
  });

  it("Tests that the text is cleared when you submit the message", async () => {
    renderComponent();
    const textBox = await screen.getByPlaceholderText("Enter a message...");
    const submitButton = await screen.getByText("Submit");

    expect(submitButton).toBeDisabled();

    await act(async () => {
      await userEvent.type(textBox, "I am awesome text!");
    });

    expect(submitButton).not.toBeDisabled();
    submitButton.click();

    await waitFor(() => {
      expect(textBox).toHaveValue("");
    });
  });
});
