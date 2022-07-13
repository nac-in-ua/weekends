import { useState } from 'react'
import Modal from './Modal'
import ModalRow from './ModalRow'
import TextInput from '../Inputs/TextInput'
import Toggle from '../Toggles/Toggle'
import { DayDropdown, HourDropdown } from '../Dropdowns'
import { ISettings } from '../../../types'

type SettingsModalProps = {
  onApply: Function
  onCancel: Function
  settings: ISettings
  title: string
}

function SettingsModal({
  title,
  settings,
  onApply,
  onCancel,
}: SettingsModalProps) {
  const [greetingsText, setGeetingsText] = useState(settings.greetingsText)
  const [day, setDay] = useState(settings.day)
  const [hour, setHour] = useState(settings.hour)
  const [useSystemTheme, setuUseSystemTheme] = useState(settings.useSystemTheme)

  const handleApply = () => {
    if (greetingsText.trim().length > 0) {
      onApply({
        greetingsText,
        day,
        hour,
        useSystemTheme,
      })
    }
  }

  const handleToggleChange = () => {
    setuUseSystemTheme((oldValue) => !oldValue)
  }

  return (
    <Modal title={title} onApply={handleApply} onCancel={onCancel}>
      <section
        data-testid="settings-modal"
        className="flex flex-col border-y py-2 text-xl font-thin text-slate-600 dark:text-gray-400"
      >
        <ModalRow>
          <div className="flex w-1/2">Greetings text</div>
          <TextInput
            placeholder="Have a beer"
            value={greetingsText}
            onChange={setGeetingsText}
          />
        </ModalRow>
        <ModalRow>
          <DayDropdown selectedValue={day} onChange={setDay} />
          <HourDropdown selectedValue={hour} onChange={setHour} />
        </ModalRow>
        <ModalRow>
          <div className="flex w-1/2">Use system theme</div>
          <Toggle isChecked={useSystemTheme} onClick={handleToggleChange} />
        </ModalRow>
      </section>
    </Modal>
  )
}

export default SettingsModal
