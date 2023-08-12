import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useState, useEffect } from 'react'
import Dropdown from '@/components/Dropdown'
import Equivalence from '@/components/Equivalence'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons'
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

import { APIErrorResponse, APIHistoricalResponse } from '../responses'
import ConvertedDropdown from '@/components/ConvertedDropdown'
import SwapButton from '@/components/SwapButton'
type FetchedRates = Pick<APIHistoricalResponse, 'rates'>

const inter = Inter({ subsets: ['latin'] })


export default function Home() {

  const [rates, setRates] = useState<FetchedRates>();

  let currencies = ["USD", "GBP", "EUR", "JPY", "AUD", "CAD"];

  // NOTE: Maybe I extract this into a Hook?
  useEffect(() => {
    let ignore = false
    const datestring = new Date().toISOString().split("T")[0]
    const searchParams = new URLSearchParams()
    searchParams.set('base', currencies[0])
    searchParams.set('symbols', currencies.join(','))
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
  const [curB, setCurB] = useState<string>(currencies[0]);

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

  const handleChangeAmntB = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAmntB(parseFloat(e.target.value));
  }

  // Calculates and sets amntB in ConvertedDropdown.tsx
  const changeAmntB = (amntB: number) => {
    setAmntB(amntB);
  }

  const handleClick = () => {
    const tempCur = curA;
    setCurA(curB);
    setCurB(tempCur);


  }


  // TODO: Delete these before going to prod
  useEffect(() => {
    console.log("curA:", curA);
    console.log("AmountA:", amntA);
  }, [curA, amntA]);

  useEffect(() => {
    console.log("curB:", curB);
    console.log("AmountB:", amntB);
  }, [curB, amntB]);

  // INFO: This is a stopgap to enable project to build
  if (!rates) { 
    return <p> Loading... </p>
  }


  return (
    <>
      <Header />
      <Equivalence curA={curA} curB={curB} rateA={rates?.rates[curA]} rateB={rates?.rates[curB]} />
      <div className={styles.dropdownContainer}>
        <Dropdown currencies={currencies} curA={curA} curB={curB} onChangeCur={handleChangeCurA} enabled={true} amntA={amntA} onChangeAmnt={handleChangeAmntA} />
        <FontAwesomeIcon icon={faArrowRightLong} className={styles.arrow} size="6x" />
        <ConvertedDropdown currencies={currencies} onChangeCur={handleChangeCurB} onChangeAmnt={handleChangeAmntB} changeAmntB={changeAmntB} enabled={false} curA={curA} curB={curB} amntA={amntA} amntB={amntB} rates={rates} />
      </div>
      {/* <FontAwesomeIcon icon={faArrowsRotate} className={styles.swapButton} size="3x" /> */}
      <SwapButton handleClick={handleClick}/>
      <Footer />
    </>
  )
}
