import DarkModeSwitcher from '../DarkModeSwitcher'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useSettings } from '../../../hooks/useSettings'

jest.mock('../../../hooks/useSettings')

describe('DarkModeSwitcher', () => {
  const handleApply = jest.fn()
  const mockedUseSettings = jest.mocked(useSettings)

  beforeEach(() => {
    handleApply.mockClear()
    mockedUseSettings.mockClear()
  })

  it('should be in the document', () => {
    mockedUseSettings.mockImplementation(() => [
      {
        useSystemTheme: false,
        theme: 'light',
        greetingsText: 'sample',
        day: 5,
        hour: 18,
        isFirstLoad: false,
      },
      handleApply,
    ])
    render(<DarkModeSwitcher />)
    const toggle = screen.getByRole('checkbox')
    expect(toggle).toBeInTheDocument()
  })

  it('shouldn not be in the document', () => {
    mockedUseSettings.mockImplementation(() => [
      {
        useSystemTheme: true,
        theme: 'light',
        greetingsText: 'sample',
        day: 5,
        hour: 18,
        isFirstLoad: false,
      },
      handleApply,
    ])
    render(<DarkModeSwitcher />)
    const toggle = screen.queryByRole('checkbox')
    expect(toggle).not.toBeInTheDocument()
  })

  it('should be turned off', () => {
    mockedUseSettings.mockImplementation(() => [
      {
        useSystemTheme: false,
        theme: 'light',
        greetingsText: 'sample',
        day: 5,
        hour: 18,
        isFirstLoad: false,
      },
      handleApply,
    ])
    render(<DarkModeSwitcher />)
    const toggle = screen.getByRole('checkbox')
    expect(toggle).not.toBeChecked()
  })

  it('should be turned on', () => {
    mockedUseSettings.mockImplementation(() => [
      {
        useSystemTheme: false,
        theme: 'dark',
        greetingsText: 'sample',
        day: 5,
        hour: 18,
        isFirstLoad: false,
      },
      handleApply,
    ])
    render(<DarkModeSwitcher />)
    const toggle = screen.getByRole('checkbox')
    expect(toggle).toBeChecked()
  })

  it('should apply light theme on click', async () => {
    mockedUseSettings.mockImplementation(() => [
      {
        useSystemTheme: false,
        theme: 'dark',
        greetingsText: 'sample',
        day: 5,
        hour: 18,
        isFirstLoad: false,
      },
      handleApply,
    ])
    render(<DarkModeSwitcher />)
    const toggle = screen.getByRole('checkbox')
    userEvent.click(toggle)
    expect(handleApply).toBeCalledWith({ payload: 'light', type: 'setTheme' })
  })

  it('should apply dark theme on click', async () => {
    mockedUseSettings.mockImplementation(() => [
      {
        useSystemTheme: false,
        theme: 'light',
        greetingsText: 'sample',
        day: 5,
        hour: 18,
        isFirstLoad: false,
      },
      handleApply,
    ])
    render(<DarkModeSwitcher />)
    const toggle = screen.getByRole('checkbox')
    userEvent.click(toggle)
    expect(handleApply).toBeCalledWith({ payload: 'dark', type: 'setTheme' })
  })
})
