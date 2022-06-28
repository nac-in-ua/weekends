import { getDefaultSettings } from './settings'
import {
  writeToLocalstorage,
  readFromLocalstorage,
} from './localstorageAdapter'

type Theme = 'light' | 'dark'

interface IGetDefaultSettings {
  greetingsText: string
  day: number
  hour: number
  theme: Theme
  useSystemTheme: boolean
  isFirstLoad: boolean
}

const loadSettings = (): IGetDefaultSettings => {
  const localStorageData = readFromLocalstorage('settings')
  if (!localStorageData) {
    writeSettings(getDefaultSettings())
    return getDefaultSettings()
  }
  return JSON.parse(atob(localStorageData))
}

const writeSettings = (settings: IGetDefaultSettings): void => {
  writeToLocalstorage('settings', btoa(JSON.stringify(settings)))
}

export { loadSettings, writeSettings }
