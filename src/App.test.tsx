import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { initResource } from "./index";
test("renders learn react link", () => {
  const { getByText } = render(<App resource={initResource()} />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
