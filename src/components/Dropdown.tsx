import React from "react";
import styles from '../styles/Dropdown.module.css';

interface DropdownProps {
  currencies: string[];
  enabled: boolean
  onChangeCur: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeAmnt: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ currencies, onChangeCur, onChangeAmnt, enabled }) => {


  return (
    <div className={styles.wholeContainer}>
      {/* <label htmlFor="curSelect">Choose a currency:</label> */}
      <select id="curSelect" className={styles.select} onChange={onChangeCur}>
        {currencies.map((cur) => (
          <option key={cur}>
            {cur}
          </option>
        ))}
      </select>
      <input id="amountInput" onChange={onChangeAmnt} className={styles.input} disabled={!enabled} type="number" placeholder="00.00"/>
    </div>
  );
};

export default Dropdown;
