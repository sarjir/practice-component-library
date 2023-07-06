import { useState } from "react";

export function useActiveColumns(originalState: string[]): [string[], (column: string) => void ] {
  const [activeColumns, updateActiveColumns] = useState(originalState);

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

  return [activeColumns, handleActiveColumns]
}