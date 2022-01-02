import { blue, tomato } from '@radix-ui/colors'

/**
 * returns temperature color.
 *
 * @param temp temperature.
 */
export const getTempColor = (temp: number): string => {
  if (temp <= 0) {
    return blue.blue6
  }

  if (temp <= 10) {
    return blue.blue8
  }

  if (temp <= 20) {
    return blue.blue10
  }

  if (temp <= 30) {
    return tomato.tomato10
  }

  if (temp <= 40) {
    return tomato.tomato9
  }

  return '#202020'
}
