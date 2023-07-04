import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Table from "./index";
import employeeData from "../../data";

test("Table component should render", () => {
  render(<Table data={employeeData} />);

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
  render(<Table data={employeeData} />);

  expect(screen.getByRole("button", { name: "||| COLUMNS" }));
  expect(screen.queryByRole("menu")).not.toBeInTheDocument();

  userEvent.click(screen.getByRole("button", { name: "||| COLUMNS" }));
  await waitFor(() => {
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  expect(screen.queryAllByRole("checkbox").length).toBe(11);
});
