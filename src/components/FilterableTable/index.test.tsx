import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterableTable from "./index";
import employeeData, { EmployeeData } from "../../data";

const columns = [
  {
    field: "id",
    displayName: "ID",
  },
  {
    field: "Name",
    displayName: "Employee name",
  },
  {
    field: "Website",
    displayName: "Website",
  },
  {
    field: "Rating",
    displayName: "Rating",
  },
  {
    field: "Email",
    displayName: "Email",
  },
  {
    field: "Phone",
    displayName: "Phone",
  },
  {
    field: "Username",
    displayName: "Username",
  },
  {
    field: "City",
    displayName: "City",
  },
  {
    field: "Country",
    displayName: "Country",
  },
  {
    field: "Company",
    displayName: "Company",
  },
  {
    field: "Position",
    displayName: "Position",
  },
];

test("Table component should render", () => {
  render(
    <FilterableTable<EmployeeData> rows={employeeData} columns={columns} />
  );

  expect(screen.getAllByRole("row")).toHaveLength(100 + 1);
  expect(screen.getByText("Alan Spencer")).toBeInTheDocument();
  expect(
    screen.getByText("16b8af4d-be37-5dc9-b1aa-1f6db1d49923")
  ).toBeInTheDocument();
  expect(screen.getByText("http://ofi.mo/gaptenev")).toBeInTheDocument();
  expect(screen.getAllByText(3).length).toBeGreaterThan(1);
  expect(screen.getByText("owija@nod.ac")).toBeInTheDocument();
  expect(screen.getByText("(538) 495-1772")).toBeInTheDocument();
  expect(screen.getByText("@idsonubo")).toBeInTheDocument();
  expect(screen.getByText("Kohudi")).toBeInTheDocument();
  expect(screen.getByText("Faroe Islands")).toBeInTheDocument();
  expect(screen.getByText("Fleetwood Enterprises Inc.")).toBeInTheDocument();
  expect(
    screen.getAllByText("EEO Compliance Manager").length
  ).toBeGreaterThanOrEqual(1);
});

test("Should allow filtering of which columns to display", async () => {
  render(
    <FilterableTable<EmployeeData> rows={employeeData} columns={columns} />
  );

  expect(screen.getByRole("button", { name: "||| COLUMNS" }));
  expect(screen.queryByRole("menu")).not.toBeInTheDocument();

  userEvent.click(screen.getByRole("button", { name: "||| COLUMNS" }));
  await waitFor(() => {
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  expect(screen.queryAllByRole("checkbox").length).toBe(11);

  expect(screen.getByRole("columnheader", { name: "ID" })).toBeInTheDocument();
  userEvent.click(screen.getByRole("checkbox", { name: "ID" }));
  await waitFor(() => {
    expect(
      screen.queryByRole("columnheader", { name: "ID" })
    ).not.toBeInTheDocument();
  });
});
