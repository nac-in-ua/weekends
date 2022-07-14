import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  useSettingsData,
  useSettingsDispatch,
  SettingsContextProvider,
} from '../Settings'
import { loadSettings, writeSettings } from '../../utils/dataAdapter'
import React from 'react'

jest.mock('../../utils/dataAdapter')

const WrappedComponent = () => {
  const settings = useSettingsData()
  const dispatch = useSettingsDispatch()
  return (
    <>
      <div>{JSON.stringify(settings, null, '\t')}</div>
      <button
        onClick={() =>
          dispatch({
            type: 'setSettings',
            payload: {
              hour: 19,
              day: 4,
              greetingsText: 'Hello world',
              useSystemTheme: true,
            },
          })
        }
      >
        Apply
      </button>
    </>
  )
}

const mockedWriteSettings = jest.mocked(writeSettings)
const mockedLoadSettings = jest.mocked(loadSettings)

describe('Settings context provider', () => {
  beforeEach(() => {
    mockedWriteSettings.mockImplementation(() => {})
  })

  afterEach(() => {
    mockedLoadSettings.mockClear()
    mockedWriteSettings.mockClear()
  })

  it('should load settings', () => {
    mockedLoadSettings.mockImplementation(() => ({
      day: 6,
      hour: 18,
      greetingsText: 'Hello',
      theme: 'light',
      useSystemTheme: false,
      isFirstLoad: true,
    }))

    render(
      <SettingsContextProvider>
        <WrappedComponent />
      </SettingsContextProvider>
    )
    expect(loadSettings).toHaveBeenCalledTimes(1)
    expect(writeSettings).not.toHaveBeenCalled()
  })

  it('should load alternative settings', () => {
    mockedLoadSettings.mockImplementation(() => ({
      day: 6,
      hour: 18,
      greetingsText: 'Hello',
      theme: 'light',
      useSystemTheme: true,
      isFirstLoad: true,
    }))

    render(
      <SettingsContextProvider>
        <WrappedComponent />
      </SettingsContextProvider>
    )
    expect(loadSettings).toHaveBeenCalledTimes(1)
    expect(writeSettings).not.toHaveBeenCalled()
  })

  it('should write settings', async () => {
    mockedLoadSettings.mockImplementation(() => ({
      day: 6,
      hour: 18,
      greetingsText: 'Hello',
      theme: 'light',
      useSystemTheme: false,
      isFirstLoad: true,
    }))

    render(
      <SettingsContextProvider>
        <WrappedComponent />
      </SettingsContextProvider>
    )
    userEvent.click(screen.getByRole('button', { name: /apply/i }))
    expect(loadSettings).toHaveBeenCalledTimes(1)
    expect(writeSettings).toHaveBeenCalledWith({
      hour: 19,
      day: 4,
      greetingsText: 'Hello world',
      theme: 'light',
      useSystemTheme: true,
      isFirstLoad: true,
    })
  })

  it('should write alternative settings', async () => {
    function WrappedComponentNew() {
      const settings = useSettingsData()
      const dispatch = useSettingsDispatch()
      return (
        <>
          <div>{JSON.stringify(settings, null, '\t')}</div>
          <button
            onClick={() =>
              dispatch({
                type: 'setTheme',
                payload: 'dark',
              })
            }
          >
            Apply
          </button>
        </>
      )
    }
    mockedLoadSettings.mockImplementation(() => ({
      day: 6,
      hour: 18,
      greetingsText: 'Hello',
      theme: 'light',
      useSystemTheme: true,
      isFirstLoad: true,
    }))

    render(
      <SettingsContextProvider>
        <WrappedComponentNew />
      </SettingsContextProvider>
    )
    userEvent.click(screen.getByRole('button', { name: /apply/i }))
    expect(loadSettings).toHaveBeenCalledTimes(1)
    expect(writeSettings).toHaveBeenCalledWith({
      hour: 18,
      day: 6,
      greetingsText: 'Hello',
      theme: 'dark',
      useSystemTheme: true,
      isFirstLoad: true,
    })
  })

  it('should change theme', async () => {
    function WrappedComponentNew() {
      const settings = useSettingsData()
      const dispatch = useSettingsDispatch()
      return (
        <input
          type="checkbox"
          checked={settings.theme === 'dark'}
          onChange={() =>
            dispatch({
              type: 'setTheme',
              payload: 'dark',
            })
          }
        ></input>
      )
    }
    mockedLoadSettings.mockImplementation(() => ({
      hour: 18,
      day: 6,
      greetingsText: 'Hello',
      theme: 'dark',
      useSystemTheme: true,
      isFirstLoad: true,
    }))

    render(
      <SettingsContextProvider>
        <WrappedComponentNew />
      </SettingsContextProvider>
    )
    const checkbox = screen.getByRole('checkbox')
    userEvent.click(checkbox)
    expect(checkbox).toBeChecked()
  })

  it('should change all settings', async () => {
    function WrappedComponentNew() {
      const settings = useSettingsData()
      const dispatch = useSettingsDispatch()
      return (
        <div
          data-testid="component"
          onClick={() =>
            dispatch({
              type: 'setSettings',
              payload: {
                hour: 18,
                day: 6,
                greetingsText: 'Hello',
                useSystemTheme: true,
              },
            })
          }
        >
          {JSON.stringify(settings)}
        </div>
      )
    }
    mockedLoadSettings.mockImplementation(() => ({
      hour: 10,
      day: 3,
      greetingsText: 'sample',
      theme: 'dark',
      useSystemTheme: false,
      isFirstLoad: false,
    }))

    render(
      <SettingsContextProvider>
        <WrappedComponentNew />
      </SettingsContextProvider>
    )
    const component = screen.getByTestId('component')
    userEvent.click(component)
    expect(component).toHaveTextContent(
      '{"hour":18,"day":6,"greetingsText":"Hello","theme":"dark","useSystemTheme":true,"isFirstLoad":false}'
    )
  })

  it('should change first load settings', () => {
    function WrappedComponentNew() {
      const settings = useSettingsData()
      const dispatch = useSettingsDispatch()
      return (
        <div
          data-testid="component"
          onClick={() =>
            dispatch({
              type: 'setFirstLoad',
              payload: false,
            })
          }
        >
          {JSON.stringify(settings)}
        </div>
      )
    }
    mockedLoadSettings.mockImplementation(() => ({
      hour: 10,
      day: 3,
      greetingsText: 'sample',
      theme: 'dark',
      useSystemTheme: false,
      isFirstLoad: true,
    }))

    render(
      <SettingsContextProvider>
        <WrappedComponentNew />
      </SettingsContextProvider>
    )
    const component = screen.getByTestId('component')
    userEvent.click(component)
    expect(component).toHaveTextContent(
      '{"hour":10,"day":3,"greetingsText":"sample","theme":"dark","useSystemTheme":false,"isFirstLoad":false}'
    )
  })

  it('should throw error if no context provider provided', () => {
    function WrappedComponentNew() {
      jest.spyOn(console, 'error').mockImplementation(() => {})
      const settings = useSettingsData()
      const dispatch = useSettingsDispatch()
      expect(settings).toThrowError()
      return (
        <div
          data-testid="component"
          onClick={() =>
            dispatch({
              type: 'setFirstLoad',
              payload: false,
            })
          }
        >
          {JSON.stringify(settings)}
        </div>
      )
    }
    expect(() => render(<WrappedComponentNew />)).toThrowError()
  })
})
