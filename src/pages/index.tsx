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
};

export default function Home() {
  const [symbols, setSymbols] = useState<FetchedSymbols | null>(null);

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

  return (
    <>
      {symbols ? <Dropdown symbols={symbols} /> : <p>Loading...</p>}
    </>
  );
}