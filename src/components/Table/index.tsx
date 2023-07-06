import React, { useState } from "react";
import Row from "../Row";
import TableHeader from "../TableHeader";
import styles from "./table.module.css";

// FIXME: Copied from FilterableTable
interface HasId {
  [key: string]: string | number; // Is this negating what I want to achieve?
  id: string;
}

type Props<Type> = {
  data: Type[];
  columns: string[];
};

function Table<Type extends HasId>({ columns, data }: Props<Type>) {
  return (
    <table
      className={styles.table}
      style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
    >
      <TableHeader items={columns} />
      <tbody>
        {data.map((item) => {
          return (
            <Row
              key={`row-${item.id}`}
              id={item.id}
              cellValues={columns.map((column) => item[column])}
            />
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
