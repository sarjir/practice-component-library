import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Dropdown from "./";

const mockOnChange = jest.fn();

test("Dropdown renders", async () => {
  render(
    <Dropdown
      label="My dropdown"
      values={["first value", "second value", "third value"]}
      handleSelected={mockOnChange}
      // onChange={mockOnChange}
    />
  );

  expect(screen.getByRole("combobox")).toBeInTheDocument();
  // expect(screen.getByLabelText("My dropdown")).toBeInTheDocument();
  expect(screen.getAllByRole("option")).toHaveLength(3);

  expect(mockOnChange).not.toHaveBeenCalled();
  userEvent.selectOptions(screen.getByRole("combobox"), "second value");

  await waitFor(() => {
    expect(mockOnChange).toHaveBeenCalled();
    expect(mockOnChange).toHaveBeenCalledWith("second value");
  });
});
