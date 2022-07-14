import { useState } from 'react'
import Modal from './Modal'
import ModalRow from './ModalRow'
import TextInput from '../Inputs/TextInput'
import Toggle from '../Toggles/Toggle'
import { DayDropdown, HourDropdown } from '../Dropdowns'
import useSettings from '../../../hooks/useSettings'

type SettingsModalProps = {
  onApply: Function
  onCancel: Function
}

function SettingsModal({ onApply, onCancel }: SettingsModalProps) {
  const [settings, dispatch] = useSettings()

  const [greetingsText, setGeetingsText] = useState(settings.greetingsText)
  const [day, setDay] = useState(settings.day)
  const [hour, setHour] = useState(settings.hour)
  const [useSystemTheme, setUseSystemTheme] = useState(settings.useSystemTheme)

  const handleApply = () => {
    if (greetingsText.trim().length > 0) {
      dispatch({
        type: 'setSettings',
        payload: {
          greetingsText,
          day,
          hour,
          useSystemTheme,
        },
      })
      onApply()
    }
  }

  const handleToggleChange = () => {
    setUseSystemTheme((oldValue) => !oldValue)
  }

  return (
    <Modal title="Settings" onApply={handleApply} onCancel={onCancel}>
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
