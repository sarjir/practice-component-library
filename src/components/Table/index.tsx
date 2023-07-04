import React, { useState } from "react";
import EmployeeRow from "../EmployeeRow";
import EmployeeTableHeader from "../EmployeeTableHeader";
import employeeData from "../../data";
import styles from "./table.module.css";
import TableMenu from "../TableMenu";

type Props<Type> = {
  data: Type[];
};

const Table = (): JSX.Element => {
  const filteredMenuItems = Object.keys(employeeData[0]).filter((key) => {
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
        {<EmployeeTableHeader items={filteredMenuItems} />}
        <tbody>
          {employeeData.map((employee) => {
            return <EmployeeRow key={employee.id} {...employee} />;
          })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
