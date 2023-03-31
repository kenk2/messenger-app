import { render, screen } from "@testing-library/react";
import MessageDashboard from "@components/messageDashboard";

function renderComponent() {
  return render(<MessageDashboard />);
}

describe("Message Dashboard Tests", () => {
  it("Tests the Dashboard renders", () => {
    renderComponent();

    screen.getByText(/Submit/i);
  });
});
