import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons'
import { APIErrorResponse, APIHistoricalResponse } from '../responses'
import useSwr from 'swr'
import styles from '@/styles/Home.module.css'
import Header from '@/components/Header'
import Equivalence from '@/components/Equivalence'
import Dropdown from '@/components/Dropdown'
import ConvertedDropdown from '@/components/ConvertedDropdown'
import SwapButton from '@/components/SwapButton'
import Footer from '@/components/Footer'

type FetchedRates = Pick<APIHistoricalResponse, 'rates'>

async function fetcher(...args: Parameters<typeof fetch>) {
  return fetch(...args)
    .then(response => {
      return response.json() as Promise<APIErrorResponse | APIHistoricalResponse>
    })
}

export default function Home() {

  // const [rates, setRates] = useState<FetchedRates>();

  let currencies = ["USD", "GBP", "EUR", "JPY", "AUD", "CAD"];

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

  // Sets the calculated amntB in ConvertedDropdown.tsx (can't pass setAmntB from useState hook as prop)
  const amntBSetter = (amntB: number) => {
    setAmntB(amntB);
  }

  const handleSwap = () => {
    const tempCur = curA;
    setCurA(curB);
    setCurB(tempCur);
  }

  const datestring = new Date().toISOString().split("T")[0]
  const searchParams = new URLSearchParams()
  searchParams.set('base', currencies[0])
  searchParams.set('symbols', currencies.join(','))


  const { data, error, isLoading } = useSwr(
    decodeURIComponent(`/api/${datestring}?${searchParams.toString()}`),
    fetcher
  )

  if (isLoading) return <h1> Loading </h1>
  if (error) return <h1> An Error Occured While Fetching</h1>
  if (!data?.success) return <h1>Failed to Load Correct Data</h1>

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}> <Header /> </div>
      <div className={styles.mainContainer}>
        <div className={styles.equivalence}>
          <Equivalence curA={curA} curB={curB} rateA={data.rates[curA]} rateB={data.rates[curB]} />
        </div>
        <div className={styles.dropdownContainer}>
          <Dropdown currencies={currencies} curA={curA} curB={curB} amntA={amntA} handleChangeCurA={handleChangeCurA} handleChangeAmntA={handleChangeAmntA} enabled={true} />
          <FontAwesomeIcon icon={faArrowRightLong} className={styles.arrow} size="6x" />
          <ConvertedDropdown currencies={currencies} curA={curA} curB={curB} amntA={amntA} handleChangeCurB={handleChangeCurB} handleChangeAmntB={handleChangeAmntB} amntBSetter={amntBSetter} rates={data} enabled={false} />
        </div>
        <div className={styles.swapButton}> <SwapButton handleSwap={handleSwap} /> </div>
      </div>
      <div className={styles.flex__footer}>
        <Footer />
      </div>
    </div>
  )
}
