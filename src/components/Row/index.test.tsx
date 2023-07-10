/* eslint-disable react/jsx-key */
import { render, screen, prettyDOM } from "@testing-library/react";
import Row from "./";
import employees, { EmployeeData } from "../../data";

type OtherData = {
  id: string;
  name: String;
  "123": string;
  yes: string;
};

const otherData = {
  id: "1231234345",
  name: "Hello",
  123: "123",
  yes: "yes",
};

test("Row renders", () => {
  const [employee] = employees;
  render(
    <table>
      <tbody>
        {/* <Row id={employee.id} cellValues={Object.values(employee)} /> */}
        <Row>
          <td>{employee.id}</td>
          <td>{employee.Name}</td>
          <td>{employee.Website}</td>
          <td>{employee.Rating}</td>
          <td>{employee.Email}</td>
          <td>{employee.Phone}</td>
          <td>{employee.Username}</td>
          <td>{employee.City}</td>
          <td>{employee.Country}</td>
          <td>{employee.Company}</td>
          <td>{employee.Position}</td>
        </Row>
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

test("Row renders with other data", () => {
  render(
    <table>
      <tbody>
        <Row>
          <td>{otherData.id}</td>
          <td>{otherData.name}</td>
          <td>{otherData[123]}</td>
          <td>{otherData.yes}</td>
        </Row>
      </tbody>
    </table>
  );

  expect(screen.getByText(otherData.name)).toBeInTheDocument();
  expect(screen.getByText(otherData[123])).toBeInTheDocument();
  expect(screen.getByText(otherData.yes)).toBeInTheDocument();
});
