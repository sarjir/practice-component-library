import { EmployeeData } from "../../data";

// TODO: I need to make sure that we can filter out some of the data, or else the columns
// will not be "filterable"
function EmployeeRow({
  id,
  Name,
  Website,
  Rating,
  Email,
  Phone,
  Username,
  City,
  Country,
  Company,
  Position,
}: EmployeeData): JSX.Element {
  return (
    <tr>
      <td>{id}</td>
      <td>{Name}</td>
      <td>{Website}</td>
      <td>{Rating}</td>
      <td>{Email}</td>
      <td>{Phone}</td>
      <td>{Username}</td>
      <td>{City}</td>
      <td>{Country}</td>
      <td>{Company}</td>
      <td>{Position}</td>
    </tr>
  );
}

export default EmployeeRow;
