import { FC } from 'react';

import { format } from 'date-fns-tz';
import Select from 'react-select';

import { IResultByPollId } from 'src/types/Results';

import styles from './styles.module.scss';
import './styles.scss';

interface Props {
  setChosenUsersResultId: (value: string | null) => void;
  results: IResultByPollId[] | null;
}
const UsersSelect: FC<Props> = ({ setChosenUsersResultId, results }) => {
  if (!results) return null;
  const handleChange = (
    selectedOption: { value: string; label: string } | null,
  ) => {
    setChosenUsersResultId(selectedOption!.value);
  };
  const formatOptionLabel = ({
    label,
    customAbbreviation,
  }: {
    label: string;
    customAbbreviation: string;
  }) => (
    <div className={styles.customAbbreviation__container}>
      <div className={styles.customAbbreviation__inner}>
        {customAbbreviation}
      </div>
      <div>{label}</div>
    </div>
  );

  return (
    <Select
      className="usersSelect"
      classNamePrefix="usersSelect"
      defaultValue={{
        value: results[0]._id,
        label: results[0].user?.name || 'Anonimous',
        customAbbreviation: format(
          new Date(results[0].createdAt),
          'MMM dd yyyy HH:mm',
        ),
      }}
      formatOptionLabel={formatOptionLabel}
      options={results.map((result: IResultByPollId) => ({
        value: result._id,
        label: result.user?.name || 'Anonimous',
        customAbbreviation: format(
          new Date(result.createdAt),
          'MMM dd yyyy HH:mm',
        ),
      }))}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary50: '',
          primary: 's',
        },
      })}
      onChange={handleChange}
    />
  );
};
export default UsersSelect;
