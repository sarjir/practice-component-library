import React, { useState } from "react";
import TableMenu from "../TableMenu";
import Table from "../Table";
import { useActiveColumns } from "./useActiveColumns";

interface HasId {
  [key: string]: string | number; // Is this negating what I want to achieve? Does this open up my type to allow more than what I want?
  id: string;
}

type Props<RowType> = {
  rows: RowType[];
  columns: ColDef<RowType>[];
};

export type ColDef<RowType> = {
  field: keyof RowType;
  displayName: string;
};

function FilterableTable<RowType extends HasId>({
  rows = [],
  columns = [],
}: Props<RowType>): JSX.Element {
  const [activeColumnIds, handleActiveColumnIds] =
    useActiveColumns<RowType>(columns);

  return (
    <>
      <TableMenu
        menuItems={columns}
        activeColumns={activeColumnIds}
        toggleColumnVisibility={handleActiveColumnIds}
      />
      <Table<RowType>
        data={rows}
        activeColumnIds={activeColumnIds}
        originalColumns={columns}
      />
    </>
  );
}

export default FilterableTable;
