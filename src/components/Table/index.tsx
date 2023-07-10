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
  columns: (string | number)[];
  // columns: string[];
  originalColumns: ColDef<RowType>[];
};

function Table<RowType extends HasId>({
  columns: activeColumns,
  data: rows,
  originalColumns,
}: Props<RowType>) {
  console.log("originalColumns", originalColumns);

  // const rowsByColumn = () => {
  //   return originalColumns.map((column) => {
  //     return rows.map((row) => {
  //       return (
  //         <tr key={`row-${row.id}`} id={row.id}>
  //           <td>{row[column.field]}</td>
  //         </tr>
  //       );
  //     });
  //   });
  // };

  // const columnByRows= () => {
  //   return rows.map((row) => {
  //     return originalColumns.map((column) => {
  //       return (
  //         <tr key={`row-${row.id}`} id={row.id}>
  //           <td>{row[column.field]}</td>
  //         </tr>
  //       );
  //     });
  //   });
  // };

  // This one works 👇
  const columnByRows = () => {
    return rows.map((row) => {
      return (
        <tr key={`row-${row.id}`}>
          {originalColumns
            .filter((originalColumn) =>
              activeColumns.includes(originalColumn.field)
            )
            .map((column) => {
              return (
                <td key={`td-${row.id}-${row[column.field]}`}>
                  {row[column.field]}
                </td>
              );
            })}
        </tr>
      );
    });
  };

  // const createCellValues = () => {
  //   return rows.map((row) => {
  //     return originalColumns.map((column) => {
  //       return row[column.field];
  //     });
  //   });
  // };

  // console.log(createCellValues());
  // console.log(originalColumns);

  const currentRows = () => {
    return rows.map((row) => {
      return originalColumns
        .filter((originalColumn) =>
          activeColumns.includes(originalColumn.field)
        )
        .map((column) => row[column.field]);
    });
  };

  console.log(currentRows());

  return (
    <table
      className={styles.table}
      style={{ gridTemplateColumns: `repeat(${activeColumns.length}, 1fr)` }}
    >
      <TableHeader
        items={originalColumns
          .filter((column) => activeColumns.includes(column.field))
          .map((columns) => columns.displayName)}
      />
      <tbody>
        {/* {rows.map((item) => {
          return (
            <Row
              key={`row-${item.id}`}
              id={item.id}
              cellValues={columns.map((column) => item[column])}
            />
          );
        })} */}
        {/* {createCellValues().map((row) => {
          return <Row key={`row-${item.id}`} id={item.id} cellValues={row} />;
        })} */}
        {/* {columnByRows()} */}
        {currentRows().map((row) => {
          return (
            <Row
              // key={`${row.find((item) => item === "id")}-row-${Math.random()}`}
              key={`${row.find((item) => item === "id")}-row-${Math.random()}`}
              id={String(row.find((item) => item === "id")) || "row"}
              cellValues={row}
            />
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
