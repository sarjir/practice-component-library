import { render, screen } from "@testing-library/react";
import EmployeeRow from "./";
import employees from "../../data";

test("Row renders", () => {
  const [employee] = employees;
  render(
    <table>
      <tbody>
        <EmployeeRow {...employee} />
      </tbody>
    </table>
  );

  expect(screen.getByText(employee.id)).toBeInTheDocument();
  expect(screen.getByText(employee.Name)).toBeInTheDocument();
  expect(screen.getByText(employee.Website)).toBeInTheDocument();
  expect(screen.getByText(employee.Rating)).toBeInTheDocument();
  expect(screen.getByText(employee.Email)).toBeInTheDocument();
  expect(screen.getByText(employee.Phone)).toBeInTheDocument();
  expect(screen.getByText(employee.Username)).toBeInTheDocument();
  expect(screen.getByText(employee.City)).toBeInTheDocument();
  expect(screen.getByText(employee.Country)).toBeInTheDocument();
  expect(screen.getByText(employee.Company)).toBeInTheDocument();
  expect(screen.getByText(employee.Position)).toBeInTheDocument();
});
