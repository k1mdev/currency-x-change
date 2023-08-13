import React from "react";
import styles from '../styles/Dropdown.module.css';
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: '400'
})

interface DropdownProps {
  currencies: string[];
  curA: string;
  curB: string;
  amntA: number;
  handleChangeCurA: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleChangeAmntA: (event: React.ChangeEvent<HTMLInputElement>) => void;
  enabled: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ currencies, curA, curB, amntA, handleChangeCurA, handleChangeAmntA, enabled }) => {

  return (
    <div className={styles.wholeContainer}>
      {/* <label htmlFor="curSelect">Choose a currency:</label> */}
      <select id="curSelect" className={styles.select} onChange={handleChangeCurA}>
        {currencies.map((cur) => {
          if (cur == curA) {
            return (
              <option key={cur} selected>
                {cur}
              </option>
            )
          }
          else if (cur == curB) {
          }
          else {
            return (
              <option key={cur}>
                {cur}
              </option>
            )
          }
        })}
      </select>
      {/* Since value is set to amntA, placeholder is overridden with initial amntA which is 0 */}
      <input id="amountInput" value={amntA} onChange={handleChangeAmntA} className={`${styles.input} ${montserrat.className}`} disabled={!enabled} type="number" placeholder="00.00" />
    </div>
  );
};

export default Dropdown;
