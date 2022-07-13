import {
  ISettings,
  ITargetDayTimeWithMinutesAnsSeconds,
  Theme,
} from '../../types'

const getDefaultSettings = (): ISettings => ({
  greetingsText: 'Have a beer!',
  day: 5,
  hour: 18,
  theme: 'light',
  useSystemTheme: false,
  isFirstLoad: true,
})

const getTimerData = (targetDayTime: ITargetDayTimeWithMinutesAnsSeconds) => ({
  days: targetDayTime.day,
  hours: targetDayTime.hour,
  minutes: 0,
  seconds: 0,
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
