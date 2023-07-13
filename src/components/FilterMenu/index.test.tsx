import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterMenu from "./";
import { EmployeeData } from "@/data";
import { NumberOperator, StringOperator } from "../FilterableTable";

const columnValues: (keyof EmployeeData)[] = ["id", "Name"]; // FIXME: Need to change this to send and array of displaynamne AND id, in order to show the right text, but also create the right query
// TODO: Make sure that we cannot mix and match string vs number operations
const operatorValues: (keyof typeof StringOperator)[] = ["contains", "equals"];
test("FilterMenu renders", async () => {
  const mockQueryMakerFunction = jest.fn();

  render(
    <FilterMenu
      columnDropdownValues={columnValues}
      operatorsDropdownValues={operatorValues}
      setFilterQuery={mockQueryMakerFunction}
    />
  );

  // Should this be a listbox? 👇
  expect(screen.getAllByRole("combobox")).toHaveLength(2);
  expect(screen.getByLabelText("Columns")).toBeInTheDocument();
  userEvent.click(screen.getByLabelText("Columns"));

  await waitFor(() => {
    screen.getByRole("option", { name: "id" });
    screen.getByRole("option", { name: "Name" });
  });

  expect(screen.getByLabelText("Operator")).toBeInTheDocument();
  userEvent.click(screen.getByLabelText("Operator"));

  await waitFor(() => {
    screen.getByRole("option", { name: "equals" });
    screen.getByRole("option", { name: "contains" });
  });

  expect(screen.getByLabelText("Value")).toBeInTheDocument();
  expect(screen.getByRole("textbox")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "X" })).toBeInTheDocument();
});

test("FilterMenu creates query", async () => {
  const mockQueryMakerFunction = jest.fn();

  render(
    <FilterMenu
      columnDropdownValues={columnValues}
      operatorsDropdownValues={operatorValues}
      setFilterQuery={mockQueryMakerFunction}
    />
  );

  userEvent.click(screen.getByLabelText("Columns"));
  await waitFor(() => {
    screen.getByRole("option", { name: "id" });
  });
  // userEvent.click(screen.getByRole("option", { name: "id" }));
  userEvent.selectOptions(
    screen.getByRole("combobox", { name: "Columns" }),
    "id"
  );

  userEvent.click(screen.getByLabelText("Operator"));
  await waitFor(() => {
    screen.getByRole("option", { name: "equals" });
  });
  // userEvent.click(screen.getByRole("option", { name: "equals" }));
  userEvent.selectOptions(
    screen.getByRole("combobox", { name: "Operator" }),
    "equals"
  );

  userEvent.type(screen.getByLabelText("Value"), "123");

  await waitFor(() => {
    expect(mockQueryMakerFunction).toHaveBeenCalled();
    expect(mockQueryMakerFunction).toHaveBeenLastCalledWith({
      column: "id",
      operator: "equals",
      value: "123",
    });
  });
});
