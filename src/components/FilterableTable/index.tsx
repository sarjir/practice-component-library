import React, { useState } from "react";
import TableMenu from "../TableMenu";
import Table from "../Table";
import { useActiveColumns } from "./useActiveColumns";

/**
 * What state do I have?
 * Which columns are active to filter out that data
 * Which checkmarks are active in the menu (based on active columns?)
 *
 * this is not state
 * - original list of data
 * - all columns (can be computed)
 */
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
  const [firstElement] = data;
  const columns = Object.keys(firstElement);
  const [activeColumns, handleActiveColumns] = useActiveColumns(columns);

  return (
    <>
      <TableMenu
        menuItems={columns}
        activeColumns={activeColumns}
        toggleColumnVisibility={handleActiveColumns}
      />
      <Table<Type> data={data} columns={activeColumns} />
    </>
  );
}

export default FilterableTable;
