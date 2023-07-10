import { MouseEventHandler, SyntheticEvent, useState } from "react";
import { ColDef } from "../FilterableTable";

type Props<RowType> = {
  // menuItems: string[];
  menuItems: ColDef<RowType>[];
  toggleColumnVisibility: (column: string) => void;
  activeColumns: string[];
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

  const handleCheckboxClick = (key: RowType[keyof RowType]) => {
    console.log("key", key);
    toggleColumnVisibility(key as string);
  };

  console.log("menuItems", menuItems);

  return (
    <div>
      <button onClick={handleEditColumnsClick}>||| COLUMNS</button>
      {editMenuVisibility && (
        <div role="menu">
          {menuItems.map((item) => (
            <span key={`checkbox-${item.field}`}>
              <input
                onChange={() => handleCheckboxClick(item.field)}
                checked={activeColumns.includes(String(item.field))}
                id={`${item.field}ColumnCheckbox`}
                type="checkbox"
              />
              <label htmlFor={`${item.field}ColumnCheckbox`}>
                {item.displayName}
              </label>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default TableMenu;
