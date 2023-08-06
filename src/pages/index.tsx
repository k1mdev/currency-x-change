import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useState, useEffect } from 'react'
import { error } from 'console'
import Dropdown from '@/components/Dropdown'

const inter = Inter({ subsets: ['latin'] })

type FetchedSymbols = {
  [key: string]: string;
}

export default function Home() {

  let currencies = ["USD", "GBP", "EUR", "JPY", "AUD", "CAD"];

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


  const [curA, setCurA] = useState<string>();
  const [curB, setCurB] = useState<string>();


  const handleCurAChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurA(e.target.value);
    console.log((curA));
  }

  const handleCurBChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurB(e.target.value);
    console.log((curB));
  }


  return (
    <>
      <Dropdown currencies={currencies} onChange={handleCurAChange}/>
      <Dropdown currencies={currencies} onChange={handleCurBChange}/>
    </>
  )
}