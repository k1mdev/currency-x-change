import { APIHistoricalResponse, APIErrorResponse } from '@/responses'
import { Redis } from '@upstash/redis'
import { NextRequest, NextResponse } from 'next/server'
// NOTE: I am using NextResponse and NextRequest for edge compatibility
// NOTE: This is also because safari lacks Response.json() support

type HistoricalResponse = APIErrorResponse | APIHistoricalResponse

export const config = {
  runtime: 'edge',
  regions: ['iad1']
}

const redis = new Redis({
  url: process.env['UPSTASH_REDIS_REST_URL'] ?? 'Missing URL',
  token: process.env['UPSTASH_REDIS_REST_TOKEN'] ?? 'Missing Token'
})

export default async function handler(
  req: NextRequest,
) {
  const api_key = process.env.API_KEY
  if (!req.url) {
    const parseError = {
      success: false,
      error: {
        code: 404,
        info: "Error parsing URL on server"
      }
    }
    return NextResponse.json(parseError, { status: 404 })
  }

  const { pathname } = new URL(req.url)
  const date = pathname.split("/").at(2)

  if (!date) {
    const parameterError = {
      success: false,
      error: {
        code: 400,
        info: "Incorrect Parameter for date route"
      }
    }

    return NextResponse.json(parameterError, { status: 400 })
  }

  const searchParams = new URLSearchParams(req.url)
  const result = await redis.get<APIHistoricalResponse>(date + searchParams.toString())

  if (result) {
    return NextResponse.json(result, { status: 200 })
  }

  const response = await fetch(`http://api.exchangeratesapi.io/v1/${date}?access_key=${api_key}&${searchParams.toString()}`)
    .then(data => data.json() as Promise<HistoricalResponse>)

  if (!response.success) {
    return NextResponse.json(result, { status: 200 })
  }

  await redis.set(date + searchParams.toString(), response)

  return NextResponse.json(result, { status: 200 })
}
