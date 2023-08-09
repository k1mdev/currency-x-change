import React from "react";
import styles from '../styles/ConvertedDropdown.module.css';
import { APIHistoricalResponse } from "@/responses";

function equalizeRates(rateA: number, rateB: number) {
  return [rateA/rateA, rateB/rateA] as const
}

interface ConvertedDropdownProps {
  curA: string;
  curB: string;
  amntA: number;
  amntB: number;
  currencies: string[];
  enabled: boolean
  onChangeCur: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  rates?: Pick<APIHistoricalResponse, 'rates'>

}

const ConvertedDropdown: React.FC<ConvertedDropdownProps> = ({ currencies, amntA, curB, curA, onChangeCur, enabled, rates }) => {

  // NOTE: Maybe I use a Ref here?
  if (!rates) return ( <> <h2> No </h2> </>)

  const [rateA, rateB] = equalizeRates(rates?.rates[curA], rates?.rates[curB])

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
          { /* TODO: Refactor out the textarea for another attribute */}
          <textarea id="amountInput" className={styles.output} disabled={!enabled} placeholder="00.00" value={(rateB * amntA).toFixed(2)}></textarea>
      </div>
  )
}

export default ConvertedDropdown;
