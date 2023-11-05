import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders login button", () => {
  render(<App />);
  const buttonElement = screen.getByRole("button", {
    name: /Login by Spotify account/i,
  });
  expect(buttonElement).toBeInTheDocument();
});
