function TableHeader({ items }: { items: string[] }): JSX.Element {
  return (
    <thead>
      <tr>
        {items.map((item) => {
          return (
            <th key={item}>
              <span>{item}</span>
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

export default TableHeader;
