
import { APIConversionResponse, APIErrorResponse } from '@/responses'
import type { NextApiRequest, NextApiResponse } from 'next'

type ConversionResponse = APIErrorResponse | APIConversionResponse

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ConversionResponse>
) {
  const api_key = process.env.API_KEY
  if (!req.url) {
    return res.status(404).json({ success: false, error: { code: 404, info: "Error parsing URL on server" } })
  }
  const { searchParams } = new URL(req.url)
  const response = await fetch(`https://api.exchangeratesapi.io/v1/convert?access_key=${api_key}&${searchParams.toString()}`)
  return res.status(response.status).send(await response.json().then(data => data as ConversionResponse))
}
