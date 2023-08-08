import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useState, useEffect } from 'react'
import { error } from 'console'
import Dropdown from '@/components/Dropdown'
import Equivalence from '@/components/Equivalence'

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


  const handleCurAChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value, tagName } = e.target;
    tagName === "SELECT" ? setCurA(value) : setAmntA(parseFloat(value));
  }

  const handleCurBChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value, tagName } = e.target;
    tagName === "SELECT" ? setCurB(value) : setAmntB(parseFloat(value));
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
      <Equivalence curA={curA} curB={curB} />
      <Dropdown currencies={currencies} onChange={handleCurAChange} />
      <Dropdown currencies={currencies} onChange={handleCurBChange} />
    </>
  )
}