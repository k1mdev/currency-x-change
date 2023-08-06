import React from "react";
import styles from '../styles/Dropdown.module.css';

interface DropdownProps {
  currencies: string[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Dropdown: React.FC<DropdownProps> = ({currencies, onChange}) => {


  return (
    <>
    <label htmlFor="curSelect">Choose a currency:</label>
      <select id="curSelect" onChange={onChange}>
      {currencies.map((cur) => (
        <option key={cur}>
          {cur}
        </option>
      ))}
    </select>
    </>
  );
};

export default Dropdown;