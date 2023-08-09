import React from "react";
import styles from '../styles/ConvertedDropdown.module.css';
import { APIHistoricalResponse } from "@/responses";


interface ConvertedDropdownProps {
  curA: string;
  curB: string;
  amntA: number;
  amntB: number;
  currencies: string[];
  enabled: boolean
  onChangeCur: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeAmnt: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rates?: Pick<APIHistoricalResponse, 'rates'>

}

const ConvertedDropdown: React.FC<ConvertedDropdownProps> = ({ currencies, amntA, curB, curA, onChangeCur, onChangeAmnt, enabled, rates }) => {

  let convRate = rates ? rates.rates[curB] : 1;


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
          <textarea id="amountInput" className={styles.output} disabled={!enabled} placeholder="00.00">{amntA * convRate}</textarea>
          <h1> 1 {curA} = {convRate} {curB}</h1>
      </div>
  )
}

export default ConvertedDropdown;