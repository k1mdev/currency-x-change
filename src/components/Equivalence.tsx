import React from "react";
import styles from "../styles/Equivalence.module.css"


interface EquivalenceProps {
    curA: string | undefined;
    curB: string | undefined;
  }

const Equivalence: React.FC<EquivalenceProps>= ({curA, curB}) => {

    const props = {
        currencyA: "USD",
        currencyCnvtd: 1.05,
        currencyB: "GBP"
    };

    return (
        <div className={styles.statement}>
            <h1>1 {curA} = {props.currencyCnvtd} {curB}</h1>
        </div>
    )
}

export default Equivalence;