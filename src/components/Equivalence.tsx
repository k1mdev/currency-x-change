import React from "react";
import styles from "../styles/Equivalence.module.css"
import { APIHistoricalResponse } from "@/responses";


interface EquivalenceProps {
  curA: string;
  curB: string;
  rates?: Pick<APIHistoricalResponse, 'rates'>
}

const Equivalence: React.FC<EquivalenceProps> = ({ curA, curB, rates }) => {
  const props = {
    currencyA: curA,
    currencyCnvtd: rates ? rates.rates[curB] : 1,
    currencyB: curB
  };

  return (
    <div className={styles.statement}>
      <h1>1 {curA} = {props.currencyCnvtd} {curB}</h1>
    </div>
  )
}

export default Equivalence;
