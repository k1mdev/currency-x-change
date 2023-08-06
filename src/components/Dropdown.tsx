import React from "react";
import styles from '../styles/Dropdown.module.css';

interface DropdownProps {
  symbols: {
    [key: string]: string;
  };
}

const Dropdown: React.FC<DropdownProps> = ({ symbols }) => {
  return (
    <>
    <label htmlFor="symbol-select">Select a symbol:</label>
      <select id="symbol-select">
      {Object.entries(symbols).map(([key, value]) => (
        <option key={key} value={key}>
          {value}
        </option>
      ))}
    </select>
    </>
  );
};

export default Dropdown;