import { render, screen, waitFor, debug } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TableHeader from "./";

const mockedMenuItems = ["id", "name"];
test("TableHeader renders", async () => {
  render(<TableHeader menuItems={mockedMenuItems} />);

  expect(
    screen.getByRole("button", { name: "||| COLUMNS" })
  ).toBeInTheDocument();
  userEvent.click(screen.getByRole("button", { name: "||| COLUMNS" }));

  await waitFor(() => {
    expect(screen.getByText("id")).toBeInTheDocument();
    expect(screen.getByText("name")).toBeInTheDocument();
    expect(screen.getAllByRole("checkbox")).toHaveLength(2);
  });
});

test("Toggles visibility of menu", async () => {
  render(<TableHeader menuItems={mockedMenuItems} />);
  expect(screen.queryByRole("menu")).not.toBeInTheDocument();

  userEvent.click(screen.getByRole("button", { name: "||| COLUMNS" }));
  await waitFor(() => {
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  userEvent.click(screen.getByRole("button", { name: "||| COLUMNS" }));
  await waitFor(() => {
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });
});
