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

// Add 'is empty' and similar later
// export enum StringOperator {
//   contains = "contains",
//   equals = "equals",
//   starts = "starts with",
//   ends = "ends with",
// }

export enum StringOperator {
  "contains",
  "equals",
  "starts with",
  "ends with",
}

// Add 'is empty' and similar later
export enum NumberOperator {
  "=",
  "!=",
  ">",
  ">=",
  "<",
  "<=",
}

type QueryToFunction = {
  [Key in StringOperator]: (
    // column: ColDef<RowType>["field"],
    // column: keyof RowType,
    value: string | number,
    rowValue: string | number
  ) => boolean;
};

// Kan jag få denna att ändra sig beroende på columnen?
// type Operator<Type> = Type extends number ? NumberOperator : StringOperator;
// type Operator = NumberOperator | StringOperator;
type Operator = keyof typeof StringOperator;

export type FilterQuery<RowType> = {
  // column: ColDef<RowType>["field"];
  column: keyof RowType;
  operator: Operator;
  value: string | number;
};

const mapQueryToFunction: QueryToFunction = {
  [StringOperator["equals"]]: (
    // column: ColDef<RowType>["field"],
    // column: keyof RowType,
    // value: string
    value: string | number,
    rowValue: string | number
  ) => {
    return rowValue === value;
  },
  [StringOperator["contains"]]: (
    // column: ColDef<RowType>["field"],
    // column: keyof RowType,
    // value: string
    value: string | number,
    rowValue: string | number
  ) => {
    return String(rowValue).includes(String(value));
  },
  [StringOperator["starts with"]]: (
    // column: ColDef<RowType>["field"],
    // column: keyof RowType,
    // value: string
    // value: keyof RowType
    value: string | number,
    rowValue: string | number
  ) => {
    return true;
  },
  [StringOperator["ends with"]]: (
    // column: ColDef<RowType>["field"],
    // column: keyof RowType,
    // value: string
    // value: keyof RowType
    value: string | number,
    rowValue: string | number
  ) => {
    return true;
  },
};

function FilterableTable<RowType extends HasId>({
  rows = [],
  columns = [],
}: Props<RowType>): JSX.Element {
  const [activeColumnIds, handleActiveColumnIds] =
    useActiveColumns<RowType>(columns);

  const [query, setQuery] = useState<FilterQuery<RowType> | null>(null);

  const rowsFilteredOnQuery: RowType[] = rows.filter((row): boolean => {
    if (!query) return true; // preferably I would like to have to check this. Can I do something before to make sure that query exist? Maybe if I wrap this in a function, and send in the query

    // const queryFunction = mapQueryToFunction[query.operator];
    const queryFunction = mapQueryToFunction[StringOperator[query.operator]];
    return queryFunction(query.value, row[query.column]);
  });

  return (
    <>
      <TableMenu
        menuItems={columns}
        activeColumns={activeColumnIds}
        toggleColumnVisibility={handleActiveColumnIds}
        setFilterQuery={setQuery}
      />
      <Table<RowType>
        // data={rows}
        data={query ? rowsFilteredOnQuery : rows}
        activeColumnIds={activeColumnIds}
        originalColumns={columns}
      />
    </>
  );
}

export default FilterableTable;
