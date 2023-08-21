import React from "react";
import styles from '../styles/ConvertedDropdown.module.css';
import { APIHistoricalResponse } from "@/responses";
import { Montserrat } from "next/font/google";
import { isNumber } from "util";

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: '400'
})

function equalizeRates(rateA: number, rateB: number) {
  return  rateB/rateA
}

interface ConvertedDropdownProps {
  currencies: string[];
  curA: string;
  curB: string;
  amntA: number;
  handleChangeCurB: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleChangeAmntB: (event: React.ChangeEvent<HTMLInputElement>) => void;
  amntBSetter: (amntB: number) => void;
  rates?: Pick<APIHistoricalResponse, 'rates'>;
  enabled: boolean;
}

const ConvertedDropdown: React.FC<ConvertedDropdownProps> = ({ currencies, curA, curB, amntA, handleChangeCurB, handleChangeAmntB, amntBSetter, rates, enabled }) => {

  // NOTE: Maybe I use a Ref here?
  if (!rates) return ( <> <h2> No </h2> </>);

  const rateB = equalizeRates(rates?.rates[curA], rates?.rates[curB])

  amntBSetter(parseFloat((rateB * amntA).toFixed(2)));

  return (
      <div className={styles.wholeContainer}>
          {/* <label htmlFor="curSelect">Choose a currency:</label> */}
          <select id="curSelect" className={styles.select} onChange={handleChangeCurB}>
          {currencies.map((cur) => {
            if (cur == curB) {
              return (
                <option key={cur} selected>
                  {cur}
                </option>
              )
            }
            else if (cur == curA) {
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
          { /* TODO: Refactor out the textarea for another attribute */}
          <input id="amountInput" className={`${styles.output} ${montserrat.className}`} onChange={handleChangeAmntB} disabled={!enabled} placeholder="0.00" value={(amntA) ? (rateB * amntA).toFixed(2) : 0.00.toFixed(2)}></input>
      </div>
  )
}

export default ConvertedDropdown;
