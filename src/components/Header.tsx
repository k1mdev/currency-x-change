import React from "react";
import styles from '../styles/Header.module.css';
import { Montserrat, Noto_Sans_Multani } from "next/font/google";

const font = Montserrat({
    subsets: ['latin'],
    weight: '400'
})

const font2 = Noto_Sans_Multani({
    subsets: ['latin'],
    weight: '400'
})

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <h1 className={font.className}>Currency</h1>
            <h1 className={`${styles.largeX} ${font2.className}`}>X</h1>
            <h1 className={font.className}>Change</h1>
        </header>
    )
}

export default Header;