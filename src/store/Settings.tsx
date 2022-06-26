import React, { useReducer, useMemo, ReactNode } from 'react'
import { loadSettings, writeSettings } from '../utils/dataAdapter'
import { getSystemTheme } from '../utils/settings'

interface IState {
  greetingsText: string
  day: number
  hour: number
  theme: string
  useSystemTheme: boolean
  isFirstLoad: boolean
}

interface ISettingsPayload {
  greetingsText: string
  day: number
  hour: number
  useSystemTheme: boolean
}

type Theme = 'light' | 'dark'

type Action =
  | { type: 'set'; payload: ISettingsPayload }
  | { type: 'setTheme'; payload: Theme }

type Dispatch = (action: Action) => void

const SettingsDataContext = React.createContext<IState | undefined>(undefined)
const SettingsDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
)

const actualSettings = (settings: IState) => {
  const actualTheme = settings.useSystemTheme
    ? getSystemTheme()
    : settings.theme
  return { ...settings, theme: actualTheme }
}

const settingsReducer = (state: IState, action: Action) => {
  switch (action.type) {
    case 'set': {
      const newSettings = action.payload
      writeSettings({ ...state, ...newSettings })
      return { ...state, ...newSettings }
    }
    case 'setTheme': {
      const newSettings = { ...state, theme: action.payload }
      writeSettings(newSettings)
      return newSettings
    }
  }
}

type ProviderProps = {
  children: ReactNode
}

const SettingsContextProvider = ({ children }: ProviderProps) => {
  const loadedSettings = useMemo(() => loadSettings(), [])
  const [state, dispatch] = useReducer(
    settingsReducer,
    loadedSettings,
    actualSettings
  )
  return (
    <SettingsDataContext.Provider value={state}>
      <SettingsDispatchContext.Provider value={dispatch}>
        {children}
      </SettingsDispatchContext.Provider>
    </SettingsDataContext.Provider>
  )
}

const useSettingsData = () => {
  const context = React.useContext(SettingsDataContext)
  if (context === undefined) {
    throw new Error(
      'useSettingsData must be used within a SettingsContextProvider'
    )
  }
  return context
}

const useSettingsDispatch = () => {
  const context = React.useContext(SettingsDispatchContext)
  if (context === undefined) {
    throw new Error(
      'useSettingsDispatch must be used within a SettingsContextProvider'
    )
  }
  return context
}

export { SettingsContextProvider, useSettingsData, useSettingsDispatch }
