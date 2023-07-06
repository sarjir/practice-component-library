import { render, screen } from "@testing-library/react";
import TableHeader from ".";

test("Table header renders", () => {
  const headerItems = ["id", "name", "rating"];
  render(
    <table>
      <TableHeader items={headerItems} />
    </table>
  );

  expect(screen.getAllByRole("columnheader")).toHaveLength(3);
});
