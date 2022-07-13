import Digitblock from './Digitblock'
import { ITargetDayTimeWithMinutesAnsSeconds } from '../../types'

type ClockProps = {
  time: ITargetDayTimeWithMinutesAnsSeconds
}

function Clock({ time }: ClockProps) {
  return (
    <div className="mt-10 flex flex-row justify-around" data-testid="clock">
      {time.day !== 0 && (
        <Digitblock label="days" digit={time.day} separator=":" />
      )}
      {(time.day !== 0 || time.hour !== 0) && (
        <Digitblock label="hours" digit={time.hour} separator=":" />
      )}
      {(time.day !== 0 || time.hour !== 0 || time.minute !== 0) && (
        <Digitblock label="minutes" digit={time.minute} separator=":" />
      )}
      <Digitblock label="seconds" digit={time.second} />
    </div>
  )
}

export default Clock
