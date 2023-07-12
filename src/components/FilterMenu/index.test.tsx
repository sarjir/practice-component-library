import { render, screen } from "@testing-library/react";
import FilterMenu from "./";

test("FilterMenu renders", () => {
  render(<FilterMenu />);

  expect(screen.getAllByRole("combobox")).toHaveLength(2);
  expect(screen.getByLabelText("Columns")).toBeInTheDocument();
  expect(screen.getByLabelText("Operator")).toBeInTheDocument();
  expect(screen.getByLabelText("Value")).toBeInTheDocument();
  expect(screen.getByRole("textbox")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "X" })).toBeInTheDocument();
});
