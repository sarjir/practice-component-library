import React, { useState } from "react";
import Row from "../Row";
import TableHeader from "../TableHeader";
import styles from "./table.module.css";
import { ColDef } from "../FilterableTable";

// FIXME: Copied from FilterableTable
interface HasId {
  [key: string]: string | number; // Is this negating what I want to achieve?
  id: string;
}

type Props<RowType> = {
  data: RowType[];
  activeColumnIds: (string | number)[];
  originalColumns: ColDef<RowType>[];
};

function Table<RowType extends HasId>({
  activeColumnIds: activeColumns,
  data: rows,
  originalColumns,
}: Props<RowType>) {
  const onlyActiveColumns = originalColumns.filter(isColumnActive);

  function isColumnActive(value: ColDef<RowType>): boolean {
    return activeColumns.includes(value.field);
  }

  function renderTableCells(row: RowType): React.ReactNode {
    return onlyActiveColumns.map((column) => {
      return (
        <td key={`td-${row.id}-${row[column.field]}`}>{row[column.field]}</td>
      );
    });
  }

  return (
    <table
      className={styles.table}
      style={{ gridTemplateColumns: `repeat(${activeColumns.length}, 1fr)` }}
    >
      <TableHeader
        items={onlyActiveColumns.map((column) => column.displayName)}
      />
      <tbody>
        {rows.map((row) => {
          return <Row key={`row-${row.id}`}>{renderTableCells(row)}</Row>;
        })}
      </tbody>
    </table>
  );
}

export default Table;
