import React, { useState } from "react";
import TableMenu from "../TableMenu";
import Table from "../Table";

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

  const [activeColumns, updateActiveColumns] = useState(columns);
  const handleActiveColumns = (column: string): void => {
    activeColumns.includes(column)
      ? updateActiveColumns(removeItemFromArray(activeColumns, column))
      : updateActiveColumns([...activeColumns, column]);
  };

  const removeItemFromArray = (
    array: string[],
    itemToRemove: string
  ): string[] => {
    const index = array.indexOf(itemToRemove);

    return [...array.slice(0, index), ...array.slice(index + 1)];
  };

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
