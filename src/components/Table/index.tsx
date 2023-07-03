import React from "react";
import employeeData from "../../data";
import styles from "./table.module.css";
import EmployeeRow from "../EmployeeRow";

type Props<Type> = {
  data: Type[];
};

const Table = (): JSX.Element => {
  return (
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
  );
};

export default Table;
