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
        <Row id={employee.id} cellValues={Object.values(employee)} />
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
        <Row id={otherData.id} cellValues={Object.values(otherData)} />
      </tbody>
    </table>
  );

  expect(screen.getByText(otherData.name)).toBeInTheDocument();
  expect(screen.getByText(otherData[123])).toBeInTheDocument();
  expect(screen.getByText(otherData.yes)).toBeInTheDocument();
});

test("Items within the row are rendered in the same order for each row", () => {
  render(
    <table>
      <tbody>
        <Row
          id={otherData.id}
          cellValues={["1231234345", "Hello", "123", "yes"]}
        />
      </tbody>
    </table>
  );

  const correctOrder = ["1231234345", "Hello", "123", "yes"];

  expect(screen.getAllByRole("cell")).toHaveLength(4);
  expect(screen.getAllByRole("cell")[0]).toHaveTextContent(correctOrder[0]);
  expect(screen.getAllByRole("cell")[1]).toHaveTextContent(correctOrder[1]);
  expect(screen.getAllByRole("cell")[2]).toHaveTextContent(correctOrder[2]);
  expect(screen.getAllByRole("cell")[3]).toHaveTextContent(correctOrder[3]);
});
