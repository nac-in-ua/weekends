import { useEffect, useState } from 'react'
import ToggleTheme from '../UI/Toggles/ToggleTheme'
import useSettings from '../../hooks/useSettings'
import { getSystemTheme, applyTheme } from '../../utils/settings'

function DarkModeSwitcher() {
  const [settings, dispatch] = useSettings()
  const { useSystemTheme, theme } = settings
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (useSystemTheme) return getSystemTheme() === 'dark'
    return theme === 'dark'
  })

  useEffect(() => {
    const currentTheme = useSystemTheme ? getSystemTheme() : theme
    setIsDarkMode(currentTheme === 'dark')
    applyTheme(currentTheme)
  }, [theme, useSystemTheme])

  return (
    <>
      {!useSystemTheme && (
        <ToggleTheme
          isChecked={isDarkMode}
          onClick={() =>
            dispatch({
              type: 'setTheme',
              payload: isDarkMode ? 'light' : 'dark',
            })
          }
        />
      )}
    </>
  )
}

export default DarkModeSwitcher
