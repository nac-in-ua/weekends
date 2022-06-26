import Clock from '../Clock/Clock'
import Actiontext from './Actiontext'
import { useEffect } from 'react'
import { useSettingsData } from '../../store/Settings'
import { getTimerData } from '../../utils/settings'
import { isFinished } from '../../utils/getTimeLeft'
import useCountdown from '../../hooks/useCountdown'

type TimerProps = {
  onFinish: Function
}

function Timer({ onFinish }: TimerProps) {
  const settings = useSettingsData()
  const time = useCountdown(getTimerData(settings))

  useEffect(() => {
    if (isFinished(time)) {
      onFinish(true)
    }
  }, [time, onFinish])

  return (
    <div>
      <Actiontext />
      <Clock time={time} />
    </div>
  )
}

export default Timer
