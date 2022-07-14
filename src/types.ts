interface ITargetDayTime {
  day: number
  hour: number
}

interface ITargetDayTimeWithMinutesAnsSeconds extends ITargetDayTime {
  minute: number
  second: number
}

type Theme = 'light' | 'dark'

interface IEditableSettings extends ITargetDayTime {
  greetingsText: string
  useSystemTheme: boolean
}

interface ISettings extends ITargetDayTime, IEditableSettings {
  theme: Theme
  isFirstLoad: boolean
}

type Action =
  | { type: 'setSettings'; payload: IEditableSettings }
  | { type: 'setInitialSettings'; payload: ITargetDayTime }
  | { type: 'setTheme'; payload: Theme }
  | { type: 'setFirstLoad'; payload: boolean }

type Dispatch = (action: Action) => void

export type {
  ITargetDayTime,
  ITargetDayTimeWithMinutesAnsSeconds,
  IEditableSettings,
  ISettings,
  Theme,
  Action,
  Dispatch,
}
