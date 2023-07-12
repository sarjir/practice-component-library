import { useState } from "react";
import { ColDef } from "../FilterableTable";
import Checkbox from "../Checkbox";
import FilterMenu from "../FilterMenu";

type Props<RowType> = {
  menuItems: ColDef<RowType>[];
  toggleColumnVisibility: (column: keyof RowType) => void;
  activeColumns: (keyof RowType)[];
};

enum MenuItem {
  Columns = "COLUMNS",
  Filters = "FILTERS",
}

type Menus = {
  [MenuItem.Columns]: JSX.Element;
  [MenuItem.Filters]: JSX.Element;
};

function TableMenu<RowType>({
  menuItems,
  activeColumns = [],
  toggleColumnVisibility,
}: Props<RowType>): JSX.Element {
  const [visibleMenu, setEditMenuVisibility] = useState<MenuItem | null>(null);

  const menus: Menus = {
    [MenuItem.Columns]: (
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
    ),
    [MenuItem.Filters]: <FilterMenu />,
  };

  const handleMenuButtonClick = (menuItem: MenuItem): void => {
    setEditMenuVisibility((prev) => {
      if (menuItem === prev) {
        return null;
      }
      return menuItem;
    });
  };

  const handleCheckboxClick = (fieldName: keyof RowType) => {
    toggleColumnVisibility(fieldName);
  };

  function renderMenu(menuItem: MenuItem) {
    return menus[menuItem];
  }

  return (
    <div>
      <button onClick={() => handleMenuButtonClick(MenuItem.Columns)}>
        ||| COLUMNS
      </button>
      <button onClick={() => handleMenuButtonClick(MenuItem.Filters)}>
        ✨ FILTERS
      </button>
      {visibleMenu && renderMenu(visibleMenu)}
    </div>
  );
}

export default TableMenu;
