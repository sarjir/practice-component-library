import employeeData from "../../data";

type Props<Type> = {
  data: Type[];
};

const Table = (): JSX.Element => {
  return (
    <div>
      {employeeData.map((employee) => {
        return (
          <div role="row" key={employee.id}>
            <span>{employee.id}</span>
            <span>{employee.Name}</span>
            <span>{employee.Website}</span>
            <span>{employee.Rating}</span>
            <span>{employee.Email}</span>
            <span>{employee.Phone}</span>
            <span>{employee.Username}</span>
            <span>{employee.City}</span>
            <span>{employee.Country}</span>
            <span>{employee.Company}</span>
            <span>{employee.Position}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Table;
