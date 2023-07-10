import { render, screen } from "@testing-library/react";
import Table from "./";

test("Should render Table", () => {
  type Test = {
    id: string;
    name: string;
    phone: string;
  };

  const mockData = [
    {
      id: "123123",
      name: "Sara",
      phone: "078834251",
    },
    {
      id: "454545",
      name: "Johan",
      phone: "074321556",
    },
  ];

  const mockColumns = [
    {
      field: "id",
      displayName: "ID",
    },
    {
      field: "name",
      displayName: "First name",
    },
    {
      field: "phone",
      displayName: "Phone nr",
    },
  ];

  render(
    <Table<Test>
      data={mockData}
      columns={["id", "name", "phone"]}
      originalColumns={mockColumns}
    />
  );
  expect(screen.getByRole("table")).toBeInTheDocument();
  expect(screen.getAllByRole("columnheader")).toHaveLength(3);
  expect(screen.getAllByRole("row")).toHaveLength(3);
});
