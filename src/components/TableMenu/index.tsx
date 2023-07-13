import { useState } from "react";
import { ColDef, FilterQuery, StringOperator } from "../FilterableTable";
import Checkbox from "../Checkbox";
import FilterMenu from "../FilterMenu";

type Props<RowType> = {
  menuItems: ColDef<RowType>[];
  toggleColumnVisibility: (column: keyof RowType) => void;
  activeColumns: (keyof RowType)[];
  setFilterQuery: (query: FilterQuery<RowType>) => void;
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
  setFilterQuery,
}: Props<RowType>): JSX.Element {
  const [visibleMenu, setEditMenuVisibility] = useState<MenuItem | null>(null);

  // TODO: Break this out into function in module scope / other file
  // Or can it be handled in a custom hook? No, I think that is reserved to state?
  const menus: Menus = {
    // Break this out to its own component to make it more readable 👇
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
    [MenuItem.Filters]: (
      <FilterMenu
        setFilterQuery={setFilterQuery}
        columnDropdownValues={menuItems.map((menuItem) => menuItem.field)}
        operatorsDropdownValues={["equals", "contains"]}
      />
    ),
  };

  const handleMenuButtonClick = (menuItem: MenuItem): void => {
    // setEditMenuVisibility((prev) => !prev);
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
