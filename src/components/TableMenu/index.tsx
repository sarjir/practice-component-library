import { MouseEventHandler, SyntheticEvent, useState } from "react";
import { ColDef } from "../FilterableTable";
import Checkbox from "../Checkbox";

type Props<RowType> = {
  menuItems: ColDef<RowType>[];
  toggleColumnVisibility: (column: RowType[keyof RowType]) => void;
  activeColumns: RowType[keyof RowType][];
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

  const handleCheckboxClick = (fieldName: RowType[keyof RowType]) => {
    toggleColumnVisibility(fieldName);
  };

  return (
    <div>
      <button onClick={handleEditColumnsClick}>||| COLUMNS</button>
      {editMenuVisibility && (
        <div role="menu">
          {menuItems.map((item) => (
            <Checkbox<RowType>
              key={`checkbox-${item.field}`}
              onChange={(fieldName) => handleCheckboxClick(fieldName)}
              label={item.displayName}
              checked={activeColumns.includes(item.field)}
              id={item.field}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TableMenu;
