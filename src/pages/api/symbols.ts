// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { APIErrorResponse, APISymbolsResponse } from '@/responses'
import { Redis } from '@upstash/redis'
import type { NextApiRequest, NextApiResponse } from 'next'

type SymbolsResponse = APIErrorResponse | APISymbolsResponse

const redis = new Redis({
  url: process.env['UPSTASH_REDIS_REST_URL'] ?? 'Missing URL',
  token: process.env['UPSTASH_REDIS_REST_TOKEN'] ?? 'Missing Token'
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SymbolsResponse>
) {
  const api_key = process.env.API_KEY
  const result = await redis.get<APISymbolsResponse>('symbols')
  if (result) {
    return res.status(200).send(result)
  }
  const response = await fetch(`https://api.exchangeratesapi.io/v1/symbols?access_key=${api_key}`)
  console.log(response)
  const { status } = response
  const data = await (response.json() as Promise<SymbolsResponse>)
  if (data.success) await redis.set('symbols', data)
  return res.status(status).json(data)
}
