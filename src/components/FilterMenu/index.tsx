import Dropdown from "../Dropdown";

function FilterMenu() {
  const values = ["2", "3", "4", "5"];
  return (
    <div style={{ display: "flex" }} role="menu">
      <button>X</button>
      <Dropdown label="Columns" values={values} />
      <Dropdown label="Operator" values={values} />
      <span style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="filterValue">Value</label>
        <input id={`filterValue`} type="text" />
      </span>
    </div>
  );
}

export default FilterMenu;
