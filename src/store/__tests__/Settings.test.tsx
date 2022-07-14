import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SettingsContextProvider } from '../Settings'
import { useSettingsData, useSettingsDispatch } from '../../hooks/useSettings'
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
})
