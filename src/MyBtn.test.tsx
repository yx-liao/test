import React from "react";
import { render } from "@testing-library/react";
import { MyBtn } from "./MyBtn";

test("test MyBtn component", () => {
  const { getByText } = render(<MyBtn>123</MyBtn>);
  const Btn = getByText(/123/);
  expect(Btn).toBeInTheDocument();
});
