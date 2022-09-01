import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders login page", () => {
    render(<App />);

    const renderLoginText = screen.getAllByText("Login");
    const inputPlaceholder = screen.getAllByPlaceholderText("Type your name here");
    const renderLoginSubtitle = screen.getByText("You don't think you should login first and behave like humans not robot.");
    const renderUseRandomName = screen.getByText("Use random name?");
    const renderLoginButton = screen.getAllByText("Login")[1];

    expect(renderLoginText).toHaveLength(2);
    expect(inputPlaceholder).toBeTruthy();
    expect(renderLoginSubtitle).toBeInTheDocument();
    expect(renderUseRandomName).toBeInTheDocument();
    expect(renderLoginButton).toBeInTheDocument();
});
