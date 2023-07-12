import styles from "./dropdown.module.css";

type Props = {
  values: string[];
  label: string;
  // onChange: (value) =>
};

function Dropdown({ values = [], label }: Props): JSX.Element {
  const id = `select-${label}`;

  return (
    <span className={styles.dropdown}>
      <label htmlFor={id}>{label}</label>
      <select id={id}>
        {values.map((value) => (
          <option key={`option-${value}`}>{value}</option>
        ))}
      </select>
    </span>
  );
}

export default Dropdown;
