import { getDefaultSettings } from './settings'
import {
  writeToLocalstorage,
  readFromLocalstorage,
} from './localstorageAdapter'

interface IGetDefaultSettings {
  greetingsText: string
  day: number
  hour: number
  theme: string
  useSystemTheme: boolean
  isFirstLoad: boolean
}

const loadSettings = (): IGetDefaultSettings => {
  const localStorData = readFromLocalstorage('settings')
  if (!localStorData) {
    writeSettings(getDefaultSettings())
    return getDefaultSettings()
  }
  return JSON.parse(atob(localStorData))
}

const writeSettings = (settings: IGetDefaultSettings): void => {
  writeToLocalstorage('settings', btoa(JSON.stringify(settings)))
}

export { loadSettings, writeSettings }
