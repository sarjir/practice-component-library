import React, { useState } from "react";
import EmployeeRow from "../EmployeeRow";
import EmployeeTableHeader from "../EmployeeTableHeader";
import employeeData, { EmployeeData } from "../../data";
import styles from "./table.module.css";
import TableMenu from "../TableMenu";

type Props<Type> = {
  data: EmployeeData[];
};

function Table<Type>({ data = [] }: Props<Type>): JSX.Element {
  // FIXME: Remove this filtering by removing the data from the source instead
  const filteredMenuItems = Object.keys(data[0]).filter((key) => {
    return (
      key !== "Is admin?" &&
      key !== "Updated on" &&
      key !== "Salary" &&
      key !== "Created on"
    );
  });

  return (
    <>
      <TableMenu menuItems={filteredMenuItems} />
      <table className={styles.table}>
        <EmployeeTableHeader items={filteredMenuItems} />
        <tbody>
          {data.map((employee) => {
            return <EmployeeRow key={employee.id} {...employee} />;
          })}
        </tbody>
      </table>
    </>
  );
}

export default Table;
