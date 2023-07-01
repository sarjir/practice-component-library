import { render, screen } from "@testing-library/react";
import Table from "./index";
import employeeData, { EmployeeData } from "../../data";

test("Table component should render", () => {
  render(<Table<EmployeeData> data={employeeData} />);

  expect(screen.getAllByRole("row")).toHaveLength(100);
});
