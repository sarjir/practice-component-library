import { useState } from "react";
import { ColDef } from "../FilterableTable";
import Checkbox from "../Checkbox";
import FilterMenu from "../FilterMenu";

type Props<RowType> = {
  menuItems: ColDef<RowType>[];
  toggleColumnVisibility: (column: keyof RowType) => void;
  activeColumns: (keyof RowType)[];
};

function TableMenu<RowType>({
  menuItems,
  activeColumns = [],
  toggleColumnVisibility,
}: Props<RowType>) {
  const [editMenuVisibility, setEditMenuVisibility] = useState(false);

  const handleEditColumnsClick = () => {
    setEditMenuVisibility((prev) => !prev);
  };

  const handleCheckboxClick = (fieldName: keyof RowType) => {
    toggleColumnVisibility(fieldName);
  };

  return (
    <div>
      <button onClick={handleEditColumnsClick}>||| COLUMNS</button>
      <button>✨ FILTERS</button>
      {editMenuVisibility && (
        <div role="menu">
          {menuItems.map((item) => (
            <Checkbox<RowType>
              key={`checkbox-${String(item.field)}`}
              onChange={(fieldName) => handleCheckboxClick(fieldName)}
              label={item.displayName}
              checked={activeColumns.includes(item.field)}
              id={item.field}
            />
          ))}
        </div>
      )}
      <FilterMenu />
    </div>
  );
}

export default TableMenu;
