import { render, screen } from "@testing-library/react";
import Table from "./index";
import employeeData from "../../data";

test("Table component should render", () => {
  //   render(<Table data={employeeData} />);
  render(<Table />);

  //   expect(screen.getAllByRole("row")).toHaveLength(100);
  expect(screen.getByText("Hello")).toBeInTheDocument();
});
