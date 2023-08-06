import React from "react";
import styles from "../styles/Equivalence.module.css"


const Equivalence: React.FC= () => {

    const props = {
        currencyA: "USD",
        currencyCnvtd: 1.05,
        currencyB: "GBP"
    };

    return (
        <div className={styles.statement}>
            <h1>1 {props.currencyA} = {props.currencyCnvtd} {props.currencyB}</h1>
        </div>
    )
}

export default Equivalence;