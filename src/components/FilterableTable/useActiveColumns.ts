import { useState } from "react";
import { ColDef } from ".";

export function useActiveColumns<RowType>(originalState: ColDef<RowType>[]): [(keyof RowType)[], (column: (keyof RowType)) => void ] {
  const columnNames = originalState.map((column) => column.field)
  const [activeColumnIds, updateActiveColumns] = useState<ColDef<RowType>["field"][]>(columnNames);

  const handleActiveColumnIds = (column: ColDef<RowType>["field"]): void => {
    activeColumnIds.includes(column)
      ? updateActiveColumns(removeItemFromArray(activeColumnIds, column))
      : updateActiveColumns([...activeColumnIds, column]);
  };

  const removeItemFromArray = (
    array: (keyof RowType)[],
    itemToRemove: keyof RowType
  ): (keyof RowType)[] => {
    const index = array.indexOf(itemToRemove);
  
    return [...array.slice(0, index), ...array.slice(index + 1)];
  };
  
  return [activeColumnIds, handleActiveColumnIds]
}

