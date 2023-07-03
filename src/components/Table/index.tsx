import React, { useState } from "react";
import EmployeeRow from "../EmployeeRow";
import EmployeeTableHeader from "../EmployeeTableHeader";
import employeeData from "../../data";
import styles from "./table.module.css";

type Props<Type> = {
  data: Type[];
};

const Table = (): JSX.Element => {
  const [editMenuVisibility, setEditMenuVisibility] = useState(false);

  const handleEditColumnsClick = () => {
    setEditMenuVisibility((prev) => !prev);
  };

  const filteredMenuItems = Object.keys(employeeData[0]).filter((key) => {
    return (
      key !== "Is admin?" &&
      key !== "Updated on" &&
      key !== "Salary" &&
      key !== "Created on"
    );
  });

  const menuItems = filteredMenuItems.map((key) => {
    return (
      <span key={key}>
        <input id={`${key}ColumnCheckbox`} type="checkbox" />
        <label htmlFor={`${key}ColumnCheckbox`}>{key}</label>
      </span>
    );
  });
  return (
    <>
      <button onClick={handleEditColumnsClick}>||| COLUMNS</button>
      {editMenuVisibility && <div role="menu">{menuItems}</div>}
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
