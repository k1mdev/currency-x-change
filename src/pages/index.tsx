import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useState, useEffect } from 'react'
import { error } from 'console'
import Dropdown from '@/components/Dropdown'
import Equivalence from '@/components/Equivalence'

import { APIErrorResponse, APIHistoricalResponse } from '../responses'

type FetchedRates = Pick<APIHistoricalResponse, 'rates'>

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [rates, setRates] = useState<FetchedRates>();

  let currencies = ["USD", "GBP", "EUR", "JPY", "AUD", "CAD"];

  useEffect(() => {
    console.log('calling Effect')
    let ignore = false
    const datestring = new Date().toISOString().split("T")[0]
    const searchParams = new URLSearchParams()
    searchParams.set('base', currencies[0])
    searchParams.set('symbols', currencies.slice(1).join(','))
    if (!ignore) fetch(decodeURIComponent(`/api/${datestring}?${searchParams.toString()}`))
      .then(response => {
        return response.json() as Promise<APIErrorResponse | APIHistoricalResponse>
      })
      .then(data => {
        if (!data.success) throw new Error(data.error.info ?? data.error.message)
        setRates(data)
      })
      .catch(e => {
        console.log(e)
      })
    return () => { ignore = true }
  }, []);

  const [curA, setCurA] = useState<string>(currencies[0]);
  const [curB, setCurB] = useState<string>(currencies[1]);

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
      <Equivalence curA={curA} curB={curB} rates={rates} />
      <Dropdown currencies={currencies} onChangeCur={handleChangeCurA} enabled={true} onChangeAmnt={handleChangeAmntA} />
      <Dropdown currencies={currencies} onChangeCur={handleChangeCurB} enabled={false} onChangeAmnt={handleChangeAmntB} />
    </>
  )
}
