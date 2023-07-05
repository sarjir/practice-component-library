import { EmployeeData } from "../../data";

// TODO: I need to make sure that we can filter out some of the data, or else the columns
// will not be "filterable"
type Props = {
  id: string;
  cellValues: (string | number)[];
};

function Row({ id, cellValues }: Props): JSX.Element {
  return (
    <tr>
      {cellValues.map((value): JSX.Element => {
        return <td key={`td-${id}-${value}`}>{value}</td>;
      })}
    </tr>
  );
}

export default Row;
