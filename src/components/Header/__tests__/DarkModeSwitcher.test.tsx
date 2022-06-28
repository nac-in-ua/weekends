import DarkModeSwitcher from '../DarkModeSwitcher'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useSettingsData, useSettingsDispatch } from '../../../store/Settings'

jest.mock('../../../store/Settings')

describe('DarkModeSwitcher', () => {
  const handleApply = jest.fn()
  const mockedUseSettingsData = jest.mocked(useSettingsData)
  const mockedUseSettingsDispatch = jest.mocked(useSettingsDispatch)

  beforeEach(() => {
    handleApply.mockClear()
    mockedUseSettingsData.mockClear()
    mockedUseSettingsDispatch.mockClear()
  })

  it('should be in the document', () => {
    mockedUseSettingsData.mockImplementation(() => ({
      useSystemTheme: false,
      theme: 'light',
      greetingsText: 'sample',
      day: 5,
      hour: 18,
      isFirstLoad: false,
    }))
    render(<DarkModeSwitcher />)
    const toggle = screen.getByRole('checkbox')
    expect(toggle).toBeInTheDocument()
  })

  it('shouldn not be in the document', () => {
    mockedUseSettingsData.mockImplementation(() => ({
      useSystemTheme: true,
      theme: 'light',
      greetingsText: 'sample',
      day: 5,
      hour: 18,
      isFirstLoad: false,
    }))
    render(<DarkModeSwitcher />)
    const toggle = screen.queryByRole('checkbox')
    expect(toggle).not.toBeInTheDocument()
  })

  it('should be turned off', () => {
    mockedUseSettingsData.mockImplementation(() => ({
      useSystemTheme: false,
      theme: 'light',
      greetingsText: 'sample',
      day: 5,
      hour: 18,
      isFirstLoad: false,
    }))
    render(<DarkModeSwitcher />)
    const toggle = screen.getByRole('checkbox')
    expect(toggle).not.toBeChecked()
  })

  it('should be turned on', () => {
    mockedUseSettingsData.mockImplementation(() => ({
      useSystemTheme: false,
      theme: 'dark',
      greetingsText: 'sample',
      day: 5,
      hour: 18,
      isFirstLoad: false,
    }))
    render(<DarkModeSwitcher />)
    const toggle = screen.getByRole('checkbox')
    expect(toggle).toBeChecked()
  })

  it('should apply light theme on click', async () => {
    mockedUseSettingsData.mockImplementation(() => ({
      useSystemTheme: false,
      theme: 'dark',
      greetingsText: 'sample',
      day: 5,
      hour: 18,
      isFirstLoad: false,
    }))
    mockedUseSettingsDispatch.mockImplementation(() => handleApply)
    render(<DarkModeSwitcher />)
    const toggle = screen.getByRole('checkbox')
    await userEvent.click(toggle)
    expect(handleApply).toBeCalledWith({ payload: 'light', type: 'setTheme' })
  })

  it('should apply dark theme on click', async () => {
    mockedUseSettingsData.mockImplementation(() => ({
      useSystemTheme: false,
      theme: 'light',
      greetingsText: 'sample',
      day: 5,
      hour: 18,
      isFirstLoad: false,
    }))
    mockedUseSettingsDispatch.mockImplementation(() => handleApply)
    render(<DarkModeSwitcher />)
    const toggle = screen.getByRole('checkbox')
    await userEvent.click(toggle)
    expect(handleApply).toBeCalledWith({ payload: 'dark', type: 'setTheme' })
  })
})
