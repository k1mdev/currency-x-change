export type APIErrorResponse = {
  success: false
  error: {
    info: string
    message?: undefined
    code: number | string
  } | {
    info?: undefined
    message: string
    code: number | string
  }
}

export type APIFluctuationResponse = {
  success: true
  fluctuation: true
  start_date: string
  end_date: string
  base: string
  rates: {
    [key: string]: {
      start_rate: number
      end_date: number
      change: number
      change_pct: number
    }
  }
}

export type APIConversionResponse = {
  success: true,
  query: {
    from: string,
    to: string
    amount: number
  }
  info: {
    timestamp: number
    rate: number
  }
  historical: string
  date: string
  result: number
}

export type APITimeseriesResponse = {
  success: true
  timeseries: true
  start_date: string
  end_date: string
  base: string
  rates: {
    [key: string]: {
      [key: string]: string
    }
  }
}

export type APISymbolsResponse = {
  success: true,
  symbols: {
    [key: string]: string
  }
}

export type APILatestResponse = {
  success: true
  timestamp: number
  base: string
  date: string
  rates: {
    [key: string]: number
  }
}

export type APIHistoricalResponse = {
  success: true
  historical: true
  date: string
  timestamp: number
  base: string
  rates: {
    [key: string]: number
  }

}
