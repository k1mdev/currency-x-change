import { APIHistoricalResponse, APIErrorResponse } from '@/responses'
import { Redis } from '@upstash/redis'
import type { NextApiRequest, NextApiResponse } from 'next'

type HistoricalResponse = APIErrorResponse | APIHistoricalResponse

const redis = new Redis({
  url: process.env['UPSTASH_REDIS_REST_URL'] ?? 'Missing URL',
  token: process.env['UPSTASH_REDIS_REST_TOKEN'] ?? 'Missing Token'
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HistoricalResponse>
) {
  const api_key = process.env.API_KEY
  if (!req.url) {
    return res.status(404).json({ success: false, error: { code: 404, info: "Error parsing URL on server" } })
  }

  const { date } = req.query
  if (!date || Array.isArray(date)) {
    return res.status(400).json({
      success: false,
      error: {
        code: 400,
        info: "Incorrect Parameter for date route"
      }
    })
  }

  const searchParams = new URLSearchParams(req.url)
  const result = await redis.get<APIHistoricalResponse>(date + searchParams.toString())

  if (result) {
    return res.status(200).json(result)
  }

  const response = await fetch(`http://api.exchangeratesapi.io/v1/${date}?access_key=${api_key}&${searchParams.toString()}`)
    .then(data => data.json() as Promise<HistoricalResponse>)

  if (!response.success) {
    let status
    if (typeof response.error.code === 'string') {
      status = 400
    } else {
      status = response.error.code
    }
    return res.status(status).json(response)
  }

  await redis.set(date + searchParams.toString(), response)

  return res.status(200).json(response)
}
