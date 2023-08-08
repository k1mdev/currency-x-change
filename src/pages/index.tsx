import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useState, useEffect } from 'react'
import { error } from 'console'
import Dropdown from '@/components/Dropdown'
import Equivalence from '@/components/Equivalence'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons'
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

type FetchedSymbols = {
  [key: string]: string;
}

export default function Home() {

  const [symbols, setSymbols] = useState<FetchedSymbols>();
  
  useEffect(() => {
    fetch('/api/symbols')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error fetching symbols');
        }
        return response.json();
      })
      .then((data) => {
        setSymbols(data.symbols);
      })
      .catch((error) => {
        console.error('Error fetching symbols');
      });
  }, []);


  let currencies = ["USD", "GBP", "EUR", "JPY", "AUD", "CAD"];

  const [curA, setCurA] = useState<string>(`${currencies[0]}`);
  const [curB, setCurB] = useState<string>(`${currencies[0]}`);

  const [amntA, setAmntA] = useState<number>(0);
  const [amntB, setAmntB] = useState<number>(0);


  const handleChangeCurA = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setCurA(e.target.value);
  }

  const handleChangeAmntA = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmntA(parseFloat(e.target.value));
  }

  const handleChangeCurB = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurB(e.target.value);
  }

  const handleChangeAmntB = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmntB(parseFloat(e.target.value));
  }


  useEffect(() => {
    console.log("curA:", curA);
    console.log("AmountA:", amntA);
  }, [curA, amntA]);

  useEffect(() => {
    console.log("curB:", curB);
    console.log("AmountB:", amntB);
  }, [curB, amntB]);


  return (
    <>
      <Header />
      <Equivalence curA={curA} curB={curB} />
      <div className={styles.dropdownContainer}>
        <Dropdown currencies={currencies} onChangeCur={handleChangeCurA} onChangeAmnt={handleChangeAmntA} />
        <FontAwesomeIcon icon={faArrowRightLong} className={styles.arrow} size="6x" />
        <Dropdown currencies={currencies} onChangeCur={handleChangeCurB} onChangeAmnt={handleChangeAmntB} />
      </div>
      <FontAwesomeIcon icon={faArrowsRotate} className={styles.swapButton} size="3x" />
    </>
  )
}