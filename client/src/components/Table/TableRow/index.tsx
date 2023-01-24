import { FC } from 'react';

interface Props {
  className?: string;
}
export const TableRow: FC<Props> = ({ children, ...rest }) => {
  return <tr {...rest}>{children}</tr>;
};
