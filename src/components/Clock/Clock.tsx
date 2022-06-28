import Digitblock from './Digitblock'

interface IGetTimerData {
  days: number
  hours: number
  minutes: number
  seconds: number
}

type ClockProps = {
  time: IGetTimerData
}

function Clock({ time }: ClockProps) {
  return (
    <div className="mt-10 flex flex-row justify-around">
      {time.days !== 0 && (
        <Digitblock label="days" digit={time.days} separator=":" />
      )}
      {(time.days !== 0 || time.hours !== 0) && (
        <Digitblock label="hours" digit={time.hours} separator=":" />
      )}
      {(time.days !== 0 || time.hours !== 0 || time.minutes !== 0) && (
        <Digitblock label="minutes" digit={time.minutes} separator=":" />
      )}
      <Digitblock label="seconds" digit={time.seconds} />
    </div>
  )
}

export default Clock
