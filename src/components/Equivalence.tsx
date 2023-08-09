import React from "react";
import styles from "../styles/Equivalence.module.css"
import { APIHistoricalResponse } from "@/responses";


interface EquivalenceProps {
  curA: string;
  curB: string;
  rates?: Pick<APIHistoricalResponse, 'rates'>
}

const Equivalence: React.FC<EquivalenceProps> = ({ curA, curB, rates }) => {
  // const props = {
  //   currencyA: curA,
  //   convRate: rates ? rates.rates[curB] : 1,
  //   currencyB: curB
  // };

  let convRate = rates ? rates.rates[curB] : 1;

  return (
    <div className={styles.statement}>
      <h1> 1 {curA} = {convRate} {curB}</h1>
    </div>
  )
}

export default Equivalence;
