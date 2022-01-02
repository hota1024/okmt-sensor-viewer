import { blue, tomato } from '@radix-ui/colors'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

/**
 * Temperature type.
 */
export type Temp = {
  inside: number
  outside: number
  date: Date
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Temperature Chart',
    },
  },
}

/**
 * TempChart props.
 */
export type TempChartProps = {
  temps: Temp[]
}

/**
 * TempChart component.
 */
export const TempChart: React.VFC<TempChartProps> = (props) => {
  const { temps } = props

  return (
    <>
      <Line
        options={options}
        data={{
          labels: temps.map((t) => t.date.toLocaleString()),
          datasets: [
            {
              label: 'Inside',
              data: temps.map((t) => t.inside),
              borderColor: tomato.tomato11,
              backgroundColor: tomato.tomato10,
            },
            {
              label: 'Outside',
              data: temps.map((t) => t.outside),
              borderColor: blue.blue11,
              backgroundColor: blue.blue10,
            },
          ],
        }}
      />
    </>
  )
}
