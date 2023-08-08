import React from "react";
import styles from '../styles/Dropdown.module.css';

interface DropdownProps {
  currencies: string[];
  onChangeCur: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeAmnt: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Dropdown: React.FC<DropdownProps> = ({currencies, onChangeCur, onChangeAmnt}) => {


  return (
    <div className="wholeContainer">
      <label htmlFor="curSelect">Choose a currency:</label>
      <select id="curSelect" onChange={onChangeCur}>
        {currencies.map((cur) => (
          <option key={cur}>
            {cur}
          </option>
        ))}
      </select>

      <div className={styles.inputContainer}>
        <label htmlFor="amountInput" className={styles.label}>Amount:</label>
        <input id="amountInput" onChange={onChangeAmnt} className={styles.input} type="number" placeholder="00.00"/>
      </div>

    </div>
  );
};

export default Dropdown;