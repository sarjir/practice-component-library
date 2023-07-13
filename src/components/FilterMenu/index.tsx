import { SyntheticEvent, useState } from "react";
import Dropdown from "../Dropdown";
import {
  FilterQuery,
  NumberOperator,
  StringOperator,
} from "../FilterableTable";

type Props<RowType> = {
  columnDropdownValues: (keyof RowType)[];
  operatorsDropdownValues: OperatorKey[];
  setFilterQuery: (filterQuery: FilterQuery<RowType>) => void;
};

type OperatorKey = keyof typeof StringOperator;
// type OperatorKey = keyof typeof StringOperator | keyof typeof NumberOperator;

function FilterMenu<RowType>({
  columnDropdownValues,
  operatorsDropdownValues,
  setFilterQuery,
}: Props<RowType>) {
  // TODO: Should have debounce 👇
  // [inputText, setInputText] = useState<string>("");
  // const handleQuery = (e: EventType) => {
  // [activeColumn, setColumn] = useState<(keyof typeof columnDropdownValues)>();
  const [activeColumn, setColumn] = useState<keyof RowType>(
    columnDropdownValues[0]
  ); // I don't think that these should be empty strings. They should have the default value from the dropdown?
  const [activeOperator, setOperator] = useState<OperatorKey>(
    operatorsDropdownValues[0]
  );

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!activeColumn || !activeOperator) return;

    setFilterQuery({
      column: activeColumn,
      operator: activeOperator,
      value: e.target.value,
    });
  };

  return (
    <div style={{ display: "flex" }} role="menu">
      <button>X</button>
      <Dropdown
        handleSelected={(value: string) => setColumn(value as keyof RowType)}
        label="Columns"
        values={columnDropdownValues}
      />
      <Dropdown
        label="Operator"
        values={operatorsDropdownValues}
        handleSelected={(value: string) => setOperator(value as OperatorKey)}
      />
      <span style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="filterValue">Value</label>
        <input onChange={handleQuery} id={`filterValue`} type="text" />
      </span>
    </div>
  );
}

export default FilterMenu;
