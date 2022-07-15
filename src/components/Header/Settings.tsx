import { useState } from 'react'
import SettingsIcon from './SettingsIcon'
import SettingsModal from '../UI/Modals/SettingsModal'

function Settings() {
  const [isModalOpened, seIsModalOpened] = useState(false)

  const handleOpen = () => {
    seIsModalOpened(true)
  }
  const handleClose = () => {
    seIsModalOpened(false)
  }
  const handleApply = () => {
    seIsModalOpened(false)
  }

  return (
    <>
      <SettingsIcon onClick={handleOpen} />
      {isModalOpened && (
        <SettingsModal onApply={handleApply} onCancel={handleClose} />
      )}
    </>
  )
}

export default Settings
