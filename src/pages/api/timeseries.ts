import { APIErrorResponse, APITimeseriesResponse } from "@/responses"
import { NextApiRequest, NextApiResponse } from "next"

type TimeseriesResponse = APIErrorResponse | APITimeseriesResponse
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TimeseriesResponse>
) {
  if (!req.url) {
    return res.status(404).json({ success: false, error: { code: 404, info: "Error parsing URL on server" } })
  }
  const { searchParams } = new URL(req.url)
  const api_key = process.env.API_KEY
  const response = await fetch(`https://api.exchangeratesapi.io/v1/timeseries?access_key=${api_key}&${searchParams.toString()}`)
  return res.status(response.status).send(await response.json().then(data => data as TimeseriesResponse))
}
