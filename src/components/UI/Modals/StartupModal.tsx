import Modal from './Modal'
import { DayDropdown, HourDropdown } from '../../UI/Dropdowns'
import { useState } from 'react'
import { ITargetDayTime } from '../../../types'
import { useSettingsData, useSettingsDispatch } from '../../../store/Settings'

function StartupModal() {
  const settings = useSettingsData()
  const dispatch = useSettingsDispatch()
  const [day, setDay] = useState(settings.day)
  const [hour, setHour] = useState(settings.hour)

  const handleInitialSettings = (initialSettings: ITargetDayTime): void => {
    dispatch({
      type: 'setInitialSettings',
      payload: { ...initialSettings },
    })
    dispatch({
      type: 'setFirstLoad',
      payload: false,
    })
  }

  return (
    <Modal
      title="Please choose"
      onApply={() => handleInitialSettings({ day, hour })}
      isButtonsCentered={true}
      isHeadingCentered={true}
    >
      <section data-testid="startup-modal" className="flex flex-col font-thin">
        <div className="flex justify-center">
          <h2 className="mb-2 text-xl">Day and Hour you finish your work</h2>
        </div>
        <div className="flex items-center justify-around">
          <DayDropdown selectedValue={day} onChange={setDay} />
          <HourDropdown selectedValue={hour} onChange={setHour} />
        </div>
      </section>
    </Modal>
  )
}

export default StartupModal
