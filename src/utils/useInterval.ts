import { useEffect } from 'react'

/**
 * use interval.
 *
 * @param fn callback function.
 * @param interval interval ms.
 */
export const useInterval = (fn: () => void, interval: number) => {
  useEffect(() => {
    const id = setInterval(fn, interval)

    return () => clearInterval(id)
  }, [fn, interval])
}
