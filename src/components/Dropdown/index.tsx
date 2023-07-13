import { useState } from "react";
import styles from "./dropdown.module.css";

type Props = {
  values: (string | number | symbol)[];
  label: string;
  handleSelected: (value: string) => void;
  // onChange: (value) =>
};

function Dropdown({ values = [], label, handleSelected }: Props): JSX.Element {
  const id = `select-${label}`;
  const [selected, setSelected] = useState<string>("");

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
    handleSelected(e.target.value);
  };

  return (
    <span className={styles.dropdown}>
      <label htmlFor={id}>{label}</label>
      <select
        value={selected}
        onChange={(e) => handleOnChange(e)}
        id={id}
        name={label}
      >
        {values.map((value) => (
          <option key={`option-${String(value)}`} value={String(value)}>
            {String(value)}
          </option>
        ))}
      </select>
    </span>
  );
}

export default Dropdown;
