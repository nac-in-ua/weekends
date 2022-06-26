import { useState, useEffect } from 'react'
import { getTimeLeft } from '../utils/getTimeLeft'

interface IDEFAULT_FRIDAY {
  day: number
  hour: number
  minute: number
  second: number
}

const useCountdown = (targetTime: IDEFAULT_FRIDAY) => {
  const [time, setTime] = useState(getTimeLeft(targetTime))

  useEffect(() => {
    const interval = setTimeout(() => {
      setTime(getTimeLeft(targetTime))
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [time, targetTime])

  return time
}

export default useCountdown
