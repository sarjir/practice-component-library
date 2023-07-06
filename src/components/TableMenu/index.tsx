import { MouseEventHandler, SyntheticEvent, useState } from "react";

type Props = {
  menuItems: string[];
  toggleColumnVisibility: (column: string) => void;
  activeColumns: string[];
};

function TableMenu({
  menuItems,
  activeColumns = [],
  toggleColumnVisibility,
}: Props) {
  const [editMenuVisibility, setEditMenuVisibility] = useState(false);

  const handleEditColumnsClick = () => {
    setEditMenuVisibility((prev) => !prev);
  };

  const handleCheckboxClick = (key: string) => {
    toggleColumnVisibility(key);
  };

  return (
    <div>
      <button onClick={handleEditColumnsClick}>||| COLUMNS</button>
      {editMenuVisibility && (
        <div role="menu">
          {menuItems.map((key) => (
            <span key={key}>
              <input
                onChange={() => handleCheckboxClick(key)}
                checked={activeColumns.includes(key)}
                id={`${key}ColumnCheckbox`}
                type="checkbox"
              />
              <label htmlFor={`${key}ColumnCheckbox`}>{key}</label>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default TableMenu;
