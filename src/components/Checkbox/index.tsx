import { ColDef } from "../FilterableTable";

type Props<RowType> = {
  label: ColDef<RowType>["displayName"];
  id: ColDef<RowType>["field"];
  checked: boolean;
  onChange: (id: keyof RowType) => void;
};

function Checkbox<RowType>({ label, id, checked, onChange }: Props<RowType>) {
  return (
    <span>
      <input
        onChange={() => onChange(id)}
        checked={checked}
        id={`${String(id)}-columnCheckbox`}
        type="checkbox"
      />
      <label htmlFor={`${String(id)}-columnCheckbox`}>{label}</label>
    </span>
  );
}

export default Checkbox;
