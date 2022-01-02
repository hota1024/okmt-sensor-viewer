import { http } from './http'

/**
 * returns inside temperature.
 */
export const getInsideTemperature = async (): Promise<number> => {
  const response = await http.get<{ temperature: number }>(
    '/nature-remo/inside'
  )

  return response.data.temperature
}

/**
 * returns inside temperature.
 */
export const getOutsideTemperature = async (): Promise<number> => {
  const response = await http.get<{ temperature: number }>(
    '/nature-remo/outside'
  )

  return response.data.temperature
}

/**
 * Temperature type.
 */
export type Temperature = {
  id: string
  inside: number
  outside: number
  createdAt: Date
}

/**
 * returns ranged temperature.
 *
 * @param start start date.
 * @param end end date.
 */
export const getRangeTemps = async (
  start: Date,
  end: Date
): Promise<Temperature[]> => {
  const { data } = await http.get<Temperature[]>('/temperatures/query', {
    params: {
      start: start.toISOString(),
      end: end.toISOString(),
    },
  })

  return data.map((t) => ({
    ...t,
    createdAt: new Date(t.createdAt as unknown as string),
  }))
}
