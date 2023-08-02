import React from "react";
import styles from '../styles/Header.module.css';

const Header: React.FC = () => {
    return (
        <div className={styles.header}>
            <h1>currency</h1>
            <h1 className={styles.largeX}>X</h1>
            <h1>change</h1>
        </div>
    )
}

export default Header;