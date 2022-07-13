import dayjs from 'dayjs'
import objectSupport from 'dayjs/plugin/objectSupport'
import { ITargetDayTimeWithMinutesAnsSeconds } from '../types'
dayjs.extend(objectSupport)

const SECONDS_IN = {
  DAY: 86400,
  HOUR: 3600,
  MINUTE: 60,
}

const getTimeLeft = (
  targetValue: ITargetDayTimeWithMinutesAnsSeconds
): ITargetDayTimeWithMinutesAnsSeconds => {
  const secondsLeft = dayjs().set(targetValue).diff(dayjs(), 'second')
  if (secondsLeft <= 0) {
    return {
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
    }
  }
  const day = Math.trunc(secondsLeft / SECONDS_IN.DAY)
  const hour = Math.trunc(secondsLeft / SECONDS_IN.HOUR)
  const minute = Math.trunc(secondsLeft / SECONDS_IN.MINUTE)
  return {
    day,
    hour: hour - day * 24,
    minute: minute - hour * 60,
    second: secondsLeft - minute * 60,
  }
}

const isFinished = (currentValue: ITargetDayTimeWithMinutesAnsSeconds) =>
  Object.values(currentValue).every((value) => value === 0)

export { getTimeLeft, isFinished }
