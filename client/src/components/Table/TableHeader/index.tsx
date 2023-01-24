import { FC } from 'react';

interface Props {
  className: string;
}
export const TableHeader: FC<Props> = ({ children, ...rest }) => {
  return <thead {...rest}>{children}</thead>;
};
