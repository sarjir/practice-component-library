import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TableHeader from "./";

const mockedMenuItems = ["id", "name"];
const mockToggleVisibility = jest.fn();

test("TableHeader renders", async () => {
  render(
    <TableHeader
      activeColumns={["id"]}
      menuItems={mockedMenuItems}
      toggleColumnVisibility={mockToggleVisibility}
    />
  );

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

test("Toggles visibility of menu and allows for filtering", async () => {
  render(
    <TableHeader
      activeColumns={["id"]}
      menuItems={mockedMenuItems}
      toggleColumnVisibility={mockToggleVisibility}
    />
  );
  expect(screen.queryByRole("menu")).not.toBeInTheDocument();

  userEvent.click(screen.getByRole("button", { name: "||| COLUMNS" }));
  await waitFor(() => {
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  expect(screen.getByRole("checkbox", { name: "id" })).toBeChecked();

  expect(mockToggleVisibility).not.toHaveBeenCalled();
  userEvent.click(screen.getByRole("checkbox", { name: "id" }));
  await waitFor(() => {
    expect(mockToggleVisibility).toBeCalledTimes(1);
  });

  userEvent.click(screen.getByRole("button", { name: "||| COLUMNS" }));
  await waitFor(() => {
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });
});
