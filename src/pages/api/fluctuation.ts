import { NextApiRequest, NextApiResponse } from "next"

type FluctuationResponse = {
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
} | {
  success: false,
  error: {
    info: string,
    code: number | string
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FluctuationResponse>
) {
  if (!req.url) {
    return res.status(404).json({ success: false, error: { code: 404, info: "Error parsing URL on server" } })
  }
  const { searchParams } = new URL(req.url)
  const api_key = process.env.API_KEY
  const response = await fetch(`https://api.exchangeratesapi.io/v1/timeseries?access_key=${api_key}&${searchParams.toString()}`)
  return res.status(response.status).send(await response.json().then(data => data as FluctuationResponse))
}
