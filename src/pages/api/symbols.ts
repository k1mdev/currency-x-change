// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { APIErrorResponse, APISymbolsResponse } from '@/responses'
import type { NextApiRequest, NextApiResponse } from 'next'

type SymbolsResponse = APIErrorResponse | APISymbolsResponse

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SymbolsResponse>
) {
  const api_key = process.env.API_KEY
  const response = await fetch(`https://api.exchangeratesapi.io/v1/symbols?access_key=${api_key}`)
  return res.status(response.status).send(await response.json().then(data => data as SymbolsResponse))
}
