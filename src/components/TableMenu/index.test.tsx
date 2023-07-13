import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TableMenu from "./";
import { EmployeeData } from "@/data";
import { ColDef } from "../FilterableTable";

const mockedMenuItems: ColDef<EmployeeData>[] = [
  { field: "Name", displayName: "Name" },
  { field: "id", displayName: "ID" },
];
const mockToggleVisibility = jest.fn();
const mockSetFilterQuery = jest.fn();

test("TableHeader renders", async () => {
  render(
    <TableMenu<EmployeeData>
      activeColumns={["id"]}
      menuItems={mockedMenuItems}
      toggleColumnVisibility={mockToggleVisibility}
      setFilterQuery={mockSetFilterQuery}
    />
  );

  expect(
    screen.getByRole("button", { name: "||| COLUMNS" })
  ).toBeInTheDocument();

  expect(
    screen.getByRole("button", { name: "✨ FILTERS" })
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
    <TableMenu<EmployeeData>
      activeColumns={["id"]}
      menuItems={mockedMenuItems}
      toggleColumnVisibility={mockToggleVisibility}
      setFilterQuery={mockSetFilterQuery}
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

  userEvent.click(screen.getByRole("button", { name: "✨ FILTERS" }));
  await waitFor(() => {
    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(screen.getByLabelText("Columns")).toBeInTheDocument();
    expect(screen.getByLabelText("Operator")).toBeInTheDocument();
    expect(screen.getByLabelText("Value")).toBeInTheDocument();
  });
});
