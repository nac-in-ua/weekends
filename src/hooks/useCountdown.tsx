import { useState, useEffect } from 'react'
import { getTimeLeft } from '../utils/getTimeLeft'
import { ITargetDayTimeWithMinutesAnsSeconds } from '../types'

const useCountdown = (targetTime: ITargetDayTimeWithMinutesAnsSeconds) => {
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
