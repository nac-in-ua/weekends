import { getDefaultSettings } from './settings'
import {
  writeToLocalstorage,
  readFromLocalstorage,
} from './localstorageAdapter'
import { ISettings } from '../types'

const loadSettings = (): ISettings => {
  const localStorageData = readFromLocalstorage('settings')
  if (!localStorageData) {
    writeSettings(getDefaultSettings())
    return getDefaultSettings()
  }
  return JSON.parse(atob(localStorageData))
}

const writeSettings = (settings: ISettings): void => {
  writeToLocalstorage('settings', btoa(JSON.stringify(settings)))
}

export { loadSettings, writeSettings }
