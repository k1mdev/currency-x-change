import React from "react";
import styles from '../styles/Dropdown.module.css';

interface DropdownProps {
  symbols: {
    [key: string]: string;
    //[key: string]: number;
  };
}

const Dropdown: React.FC = () => {

  let currencies = ["USD", "GBP", "EUR", "JPY", "AUD", "CAD"]; 

  return (
    <>
    <label htmlFor="curSelect">Choose a currency:</label>
      <select id="curSelect">
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