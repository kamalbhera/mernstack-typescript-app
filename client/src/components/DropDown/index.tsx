import { useState, FC, useEffect } from 'react';

import './style.scss';

export const DropDown: FC = ({ children }) => {
  const [open, setOpen] = useState(false);
  const handleClick = (e: MouseEvent) => {
    const button = e.target as HTMLInputElement;
    if (!button.closest('.dropdown__wrapper') && open === true) {
      setOpen(false);
    }
    if (button.closest('.dropdown__list')) {
      setOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  });
  return (
    <div className="dropdown__wrapper">
      <span
        className="material-icons-outlined dropdown__arrow"
        role="presentation"
        onClick={() => setOpen(!open)}
      >
        keyboard_arrow_down
      </span>
      {open && <div className="dropdown__list"> {children}</div>}
    </div>
  );
};
