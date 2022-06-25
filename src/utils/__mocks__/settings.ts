const getDefaultSettings = () => ({
  greetingsText: 'Have a beer!',
  day: 5,
  hour: 18,
  theme: 'light',
  useSystemTheme: false,
  isFirstLoad: true,
})

interface IFriday {
  day: number
  hour: number
  minute: number
  second: number
}

const getTimerData = (friday: IFriday) => ({
  days: friday.day,
  hours: friday.hour,
  minutes: 0,
  seconds: 0,
})

type SystemTheme = 'light' | 'dark'

const getSystemTheme = (): SystemTheme =>
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'

const applyTheme = (theme: SystemTheme): void => {
  const root = document.documentElement
  if (theme === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}

export { getTimerData, getDefaultSettings, getSystemTheme, applyTheme }
