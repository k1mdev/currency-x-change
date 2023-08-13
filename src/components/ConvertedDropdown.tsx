import React from "react";
import styles from '../styles/ConvertedDropdown.module.css';
import { APIHistoricalResponse } from "@/responses";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: '400'
})

function equalizeRates(rateA: number, rateB: number) {
  return [rateA/rateA, rateB/rateA] as const;
}

interface ConvertedDropdownProps {
  currencies: string[];
  curA: string;
  curB: string;
  amntA: number;
  handleChangeCurB: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleChangeAmntB: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  amntBSetter: (amntB: number) => void;
  rates?: Pick<APIHistoricalResponse, 'rates'>;
  enabled: boolean;
}

const ConvertedDropdown: React.FC<ConvertedDropdownProps> = ({ currencies, curA, curB, amntA, handleChangeCurB, handleChangeAmntB, amntBSetter, rates, enabled }) => {

  // NOTE: Maybe I use a Ref here?
  if (!rates) return ( <> <h2> No </h2> </>);

  const [rateA, rateB] = equalizeRates(rates?.rates[curA], rates?.rates[curB]);

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
          <textarea id="amountInput" className={`${styles.output} ${montserrat.className}`} onChange={handleChangeAmntB} disabled={!enabled} placeholder="00.00" value={(rateB * amntA).toFixed(2)}></textarea>
      </div>
  )
}

export default ConvertedDropdown;
