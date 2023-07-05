import React, { useState } from "react";
import EmployeeRow from "../EmployeeRow";
import Row from "../Row";
import EmployeeTableHeader from "../EmployeeTableHeader";
import employeeData, { EmployeeData } from "../../data";
import styles from "./table.module.css";
import TableMenu from "../TableMenu";

interface HasId {
  [key: string]: string; // Is this negating what I want to achieve?
  id: string;
}

type Props<Type> = {
  data: Type[];
};

function Table<Type extends HasId>({ data = [] }: Props<Type>): JSX.Element {
  // FIXME: Remove this filtering by removing the data from the source instead
  const columns = Object.keys(data[0]).filter((key) => {
    return (
      key !== "Is admin?" &&
      key !== "Updated on" &&
      key !== "Salary" &&
      key !== "Created on"
    );
  });

  return (
    <>
      <TableMenu menuItems={columns} />
      <table className={styles.table}>
        <EmployeeTableHeader items={columns} />
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
    </>
  );
}

export default Table;
