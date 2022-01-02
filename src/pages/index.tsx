import {
  getInsideTemperature,
  getOutsideTemperature,
  getRangeTemps,
} from '@/api/api'
import { Temp, TempChart } from '@/components/TempChart'
import { getTempColor } from '@/utils/getTempColor'
import { useInterval } from '@/utils/useInterval'
import { subHours } from 'date-fns'
import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'

/**
 * HomePage component.
 */
export const HomePage: NextPage = () => {
  const [inside, setInside] = useState<number>()
  const [outside, setOutside] = useState<number>()
  const [chart, setChart] = useState<Temp[]>([])

  const insideColor = inside ? getTempColor(inside) : 'inherit'
  const outsideColor = outside ? getTempColor(outside) : 'inherit'

  const updateTemperatures = async () => {
    setInside(await getInsideTemperature())
    setOutside(await getOutsideTemperature())
  }

  const updateChart = async () => {
    const end = new Date()
    const start = subHours(end, 24)
    const temperatures = await getRangeTemps(start, end)

    let temps = temperatures.map((t) => ({
      inside: t.inside,
      outside: t.outside,
      date: t.createdAt,
    }))

    if (temps.length <= 6) {
      temps = temps.filter((t) => t.date.getMinutes() === 0)
    }

    setChart(temps)
  }

  useInterval(updateTemperatures, 60000)
  useInterval(updateChart, 10000)

  useEffect(() => {
    updateTemperatures()
    updateChart()
  }, [])

  return (
    <>
      <Head>
        <title>room | okmt</title>
      </Head>

      <div className="container">
        <div className="temp">
          <div className="temp-inside">{inside}℃</div>
          <div className="temp-outside">{outside}℃</div>
        </div>
        <div className="chart-container">
          <TempChart temps={chart} />
        </div>
      </div>

      <style global jsx>{`
        .container {
          width: 100%;
          height: 100vh;

          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }

        .chart-container {
          max-width: 900px;
          width: 100%;
        }

        .temp {
          max-width: 200px;
          min-height: 200px;
          width: 100%;

          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;

          margin-bottom: 16px;

          border: 16px solid transparent;
          border-radius: 99999px;
          background-image: linear-gradient(white, white),
            radial-gradient(
              circle at top left,
              ${insideColor},
              #9c27b0,
              ${outsideColor}
            );
          background-origin: border-box;
          background-clip: content-box, border-box;
        }

        .temp-inside {
          font-size: 2rem;
          color: ${insideColor};
        }

        .temp-outside {
          font-size: 1rem;
          color: ${outsideColor};
        }
      `}</style>
    </>
  )
}

export default HomePage
