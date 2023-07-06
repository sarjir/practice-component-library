import React, { useState } from "react";
import TableMenu from "../TableMenu";
import Table from "../Table";

interface HasId {
  [key: string]: string | number; // Is this negating what I want to achieve? Does this open up my type to allow more than what I want?
  id: string;
}

type Props<Type> = {
  data: Type[];
};

function FilterableTable<Type extends HasId>({
  data = [],
}: Props<Type>): JSX.Element {
  // FIXME: Remove this filtering by removing the data from the source instead
  const columns = Object.keys(data[0]).filter((key) => {
    return (
      key !== "Is admin?" &&
      key !== "Updated on" &&
      key !== "Salary" &&
      key !== "Created on"
    );
  });

  return (
    <>
      <TableMenu menuItems={columns} />
      <Table<Type> data={data} columns={columns} />
    </>
  );
}

export default FilterableTable;
