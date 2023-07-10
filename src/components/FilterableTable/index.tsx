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

type Props<RowType> = {
  rows: RowType[];
  columns: ColDef<RowType>[];
};

export type ColDef<RowType> = {
  field: RowType[keyof RowType];
  displayName: string;
};

function FilterableTable<RowType extends HasId>({
  rows = [],
  columns = [],
}: Props<RowType>): JSX.Element {
  // const [firstElement] = data;
  // const columns = Object.keys(firstElement);
  const columnNames = columns.map((column) => column.displayName);

  const [activeColumns, handleActiveColumns] =
    useActiveColumns<RowType>(columns);

  return (
    <>
      <TableMenu
        menuItems={columns.map((column) => ({
          field: column.field,
          displayName: column.displayName,
        }))}
        activeColumns={activeColumns}
        toggleColumnVisibility={handleActiveColumns}
      />
      <Table<RowType>
        data={rows}
        columns={activeColumns}
        originalColumns={columns}
      />
    </>
  );
}

export default FilterableTable;
