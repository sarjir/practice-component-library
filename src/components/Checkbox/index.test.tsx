import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Checkbox from "./";

const mockOnChange = jest.fn();

type Row = {
  id: string;
  name: string;
};

test("Checkbox renders", async () => {
  render(
    <Checkbox<Row>
      checked={true}
      label="My labeltext"
      id="1232345345"
      onChange={mockOnChange}
    />
  );

  expect(screen.getByLabelText("My labeltext")).toBeInTheDocument();

  expect(mockOnChange).not.toHaveBeenCalled();
  userEvent.click(screen.getByLabelText("My labeltext"));

  await waitFor(() => {
    expect(mockOnChange).toHaveBeenCalled();
  });
});
