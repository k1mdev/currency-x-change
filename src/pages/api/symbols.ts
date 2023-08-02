// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type SymbolsResponse = {
  success: true,
  symbols: {
    [key: string]: string
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
  res: NextApiResponse<SymbolsResponse>
) {
  const api_key = process.env.API_KEY
  const response = await fetch(`https://api.exchangeratesapi.io/v1/symbols?access_key=${api_key}`)
  return res.status(response.status).send(await response.json().then(data => data as SymbolsResponse))
}
