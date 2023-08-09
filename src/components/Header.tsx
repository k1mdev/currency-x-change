import React from "react";
import styles from '../styles/Header.module.css';
import { Audiowide } from "next/font/google";
import { Montserrat } from "next/font/google";

const audiowide = Audiowide({
    subsets: ['latin'],
    weight: '400'
})

const Header: React.FC = () => {
    return (
        <div className={styles.header}>
            <h1 className={audiowide.className}>Currency</h1>
            <h1 className={`${styles.largeX} ${audiowide.className}`}>X</h1>
            <h1 className={audiowide.className}>Change</h1>
        </div>
    )
}

export default Header;