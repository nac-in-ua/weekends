import {
  ITargetDayTime,
  ITargetDayTimeWithMinutesAnsSeconds,
  Theme,
  ISettings,
} from '../types'

const DEFAULT_FRIDAY: ITargetDayTimeWithMinutesAnsSeconds = {
  day: 5,
  hour: 18,
  minute: 0,
  second: 0,
}

const DEFAULT_THEME: Theme = 'light'

const getDefaultSettings = (): ISettings => ({
  greetingsText: 'Have a beer!',
  day: DEFAULT_FRIDAY.day,
  hour: DEFAULT_FRIDAY.hour,
  theme: DEFAULT_THEME,
  useSystemTheme: false,
  isFirstLoad: true,
})

const getTimerData = (
  targetDayTime: ITargetDayTime
): ITargetDayTimeWithMinutesAnsSeconds => ({
  day: targetDayTime.day,
  hour: targetDayTime.hour,
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
