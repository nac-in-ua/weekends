import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import Timer from '../Timer'
import { useSettingsData, useSettingsDispatch } from '../../../store/Settings'

jest.mock('../../../store/Settings')

describe('Timer', () => {
  const onFinishHandler = jest.fn()
  const mockedUseSettingsData = jest.mocked(useSettingsData)
  const mockedUseSettingsDispatch = jest.mocked(useSettingsDispatch)

  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
    onFinishHandler.mockClear()
    mockedUseSettingsData.mockClear()
    mockedUseSettingsDispatch.mockClear()
  })

  it('should render', () => {
    const date = new Date(2022, 4, 23, 18, 12, 11, 0)
    jest.setSystemTime(date)
    mockedUseSettingsData.mockImplementation(() => ({
      day: 5,
      hour: 18,
      greetingsText: 'sample',
      theme: 'light',
      useSystemTheme: false,
      isFirstLoad: false,
    }))
    const { container } = render(<Timer onFinish={onFinishHandler} />)
    expect(screen.getByText(/Time left to weekends/i)).toBeInTheDocument()
    expect(screen.getByText(/seconds/i)).toBeInTheDocument()
    expect(onFinishHandler).not.toBeCalled()
    expect(container).toMatchSnapshot()
  })

  it('should trigger onFinish when time finishes', () => {
    const date = new Date(2022, 4, 23, 18, 0, 0, 0)
    jest.setSystemTime(date)
    mockedUseSettingsData.mockImplementation(() => ({
      day: 1,
      hour: 18,
      greetingsText: 'sample',
      theme: 'light',
      useSystemTheme: false,
      isFirstLoad: false,
    }))
    render(<Timer onFinish={onFinishHandler} />)
    expect(onFinishHandler).toBeCalled()
  })

  it('should trigger onFinish on next tick', () => {
    const date = new Date(2022, 4, 23, 17, 59, 59, 0)
    jest.setSystemTime(date)
    mockedUseSettingsData.mockImplementation(() => ({
      day: 1,
      hour: 18,
      greetingsText: 'sample',
      theme: 'light',
      useSystemTheme: false,
      isFirstLoad: false,
    }))
    render(<Timer onFinish={onFinishHandler} />)
    const secondsLeft = screen.getByTestId(/digit/i)
    expect(secondsLeft).toHaveTextContent('1')
    act(() => {
      jest.runOnlyPendingTimers()
    })
    expect(secondsLeft).toHaveTextContent('0')
    expect(onFinishHandler).toHaveBeenCalledTimes(1)
  })
})
