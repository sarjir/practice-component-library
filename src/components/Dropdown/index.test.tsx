import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Dropdown from "./";

const mockOnChange = jest.fn();

test("Dropdown renders", () => {
  render(
    <Dropdown
      label="My dropdown"
      values={["first value", "second value", "third value"]}
      // onChange={mockOnChange}
    />
  );

  expect(screen.getByRole("combobox")).toBeInTheDocument();
  expect(screen.getByLabelText("My dropdown")).toBeInTheDocument();
  expect(screen.getAllByRole("option")).toHaveLength(3);

  // expect(mockOnChange).not.toHaveBeenCalled();
  // userEvent.click(screen.getByRole("option", { name: "second value" }));
  // expect(mockOnChange).toHaveBeenCalled();
});
