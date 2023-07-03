import React from "react";
import employeeData from "../../data";
import styles from "./table.module.css";
import EmployeeRow from "../EmployeeRow";
import { useState } from "react";

type Props<Type> = {
  data: Type[];
};

const Table = (): JSX.Element => {
  const [editMenuVisibility, setEditMenuVisibility] = useState(false);

  const handleEditColumnsClick = () => {
    setEditMenuVisibility((prev) => !prev);
  };

  const menuItems = Object.keys(employeeData[0])
    .filter((key) => {
      return (
        key !== "Is admin?" &&
        key !== "Updated on" &&
        key !== "Salary" &&
        key !== "Created on"
      );
    })
    .map((key) => {
      // FIXME: super ugly
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
        <thead>
          <tr>
            <th>
              <span>id</span>
            </th>
            <th>
              <span>Name</span>
            </th>
            <th>
              <span>Website</span>
            </th>
            <th>
              <span>Rating</span>
            </th>
            <th>
              <span>Email</span>
            </th>
            <th>
              <span>Phone</span>
            </th>
            <th>
              <span>Username</span>
            </th>
            <th>
              <span>City</span>
            </th>
            <th>
              <span>Country</span>
            </th>
            <th>
              <span>Company</span>
            </th>
            <th>
              <span>Position</span>
            </th>
          </tr>
        </thead>
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
