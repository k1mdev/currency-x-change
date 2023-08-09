import React from "react";
import styles from "../styles/Equivalence.module.css"

import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: '400'
})

function equalizeRate(rateA: number, rateB: number) {
  return rateB/rateA
}

interface EquivalenceProps {
  curA: string;
  curB: string;
  rateA: number
  rateB: number
}

const Equivalence: React.FC<EquivalenceProps> = ({ curA, curB, rateA, rateB }) => {
  if (!rateA || !rateB) return ( <> <h2> No </h2> </>)
  return (
    <div className={styles.statement}>
      <h1 className={montserrat.className}> 1 {curA} = {equalizeRate(rateA, rateB).toFixed(2)} {curB}</h1>
    </div>
  )
}

export default Equivalence;
