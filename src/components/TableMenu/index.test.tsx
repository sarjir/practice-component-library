import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TableHeader from "./";
import { EmployeeData } from "@/data";

const mockedMenuItems = [
  { field: "name", displayName: "Name" },
  { field: "id", displayName: "ID" },
];
const mockToggleVisibility = jest.fn();

test("TableHeader renders", async () => {
  render(
    <TableHeader<EmployeeData>
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
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getAllByRole("checkbox")).toHaveLength(2);
  });
});

test("Toggles visibility of menu and allows for filtering", async () => {
  render(
    <TableHeader<EmployeeData>
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

  expect(screen.getByRole("checkbox", { name: "ID" })).toBeChecked();

  expect(mockToggleVisibility).not.toHaveBeenCalled();
  userEvent.click(screen.getByRole("checkbox", { name: "ID" }));
  await waitFor(() => {
    expect(mockToggleVisibility).toBeCalledTimes(1);
  });

  userEvent.click(screen.getByRole("button", { name: "||| COLUMNS" }));
  await waitFor(() => {
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });
});
