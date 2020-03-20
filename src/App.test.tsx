import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  const { getByText } = render(<App resource={{ read: () => "0" }} />);
  const linkElement = getByText(/0/i);
  expect(linkElement).toBeInTheDocument();
});
