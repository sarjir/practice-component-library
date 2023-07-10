// @ts-nocheck
// FIXME: Remove this 👆

import { useState } from "react";
import { ColDef } from ".";

type State<RowType> = {
  originalState: ColDef<RowType>[]
}

export function useActiveColumns<RowType>(originalState: ColDef<RowType>[]): [string[], (column: string) => void ] {
  const columnNames = originalState.map((column) => column.field)
  const [activeColumns, updateActiveColumns] = useState(columnNames);

  const handleActiveColumns = (column: string): void => {
    activeColumns.includes(column)
      ? updateActiveColumns(removeItemFromArray(activeColumns, column))
      : updateActiveColumns([...activeColumns, column]);
  };
  
  return [activeColumns, handleActiveColumns]
}

const removeItemFromArray = (
  array: string[],
  itemToRemove: string
): string[] => {
  const index = array.indexOf(itemToRemove);

  return [...array.slice(0, index), ...array.slice(index + 1)];
};