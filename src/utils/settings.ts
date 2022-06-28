interface IFriday {
  day: number
  hour: number
}

interface IDEFAULT_FRIDAY {
  day: number
  hour: number
  minute: number
  second: number
}

type Theme = 'light' | 'dark'

interface IGetDefaultSettings {
  greetingsText: string
  day: number
  hour: number
  theme: Theme
  useSystemTheme: boolean
  isFirstLoad: boolean
}

const DEFAULT_FRIDAY: IDEFAULT_FRIDAY = {
  day: 5,
  hour: 18,
  minute: 0,
  second: 0,
}

const DEFAULT_THEME: Theme = 'light'

const getDefaultSettings = (): IGetDefaultSettings => ({
  greetingsText: 'Have a beer!',
  day: DEFAULT_FRIDAY.day,
  hour: DEFAULT_FRIDAY.hour,
  theme: DEFAULT_THEME,
  useSystemTheme: false,
  isFirstLoad: true,
})

const getTimerData = (friday: IFriday): IDEFAULT_FRIDAY => ({
  day: friday.day,
  hour: friday.hour,
  minute: DEFAULT_FRIDAY.minute,
  second: DEFAULT_FRIDAY.second,
})

const getSystemTheme = (): Theme =>
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'

const applyTheme = (theme: Theme): void => {
  const root = document.documentElement
  if (theme === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}

export { getTimerData, getDefaultSettings, getSystemTheme, applyTheme }
