import { ReactNode } from "react";
import { EmployeeData } from "../../data";

type Props = {
  children: ReactNode;
};

function Row({ children }: Props): JSX.Element {
  return <tr>{children}</tr>;
}

export default Row;
