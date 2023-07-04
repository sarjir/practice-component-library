import { MouseEventHandler, SyntheticEvent, useState } from "react";

type Props = {
  menuItems: string[];
};

function TableMenu({ menuItems }: Props) {
  const [editMenuVisibility, setEditMenuVisibility] = useState(false);

  const handleEditColumnsClick = () => {
    setEditMenuVisibility((prev) => !prev);
  };

  return (
    <div>
      <button onClick={handleEditColumnsClick}>||| COLUMNS</button>
      {editMenuVisibility && (
        <div role="menu">
          {menuItems.map((key) => (
            <span key={key}>
              <input id={`${key}ColumnCheckbox`} type="checkbox" />
              <label htmlFor={`${key}ColumnCheckbox`}>{key}</label>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default TableMenu;
