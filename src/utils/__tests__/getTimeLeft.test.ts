import { getTimeLeft, isFinished } from '../getTimeLeft'

describe('getTimeLeft', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('should calculate time difference', () => {
    const date = new Date(2022, 4, 23, 11, 12, 11, 0)
    jest.setSystemTime(date)

    const targetTime = {
      day: 5,
      hour: 18,
      minute: 0,
      second: 0,
    }
    const timeLeft = getTimeLeft(targetTime)
    expect(timeLeft).toMatchObject({
      day: 4,
      hour: 6,
      minute: 47,
      second: 49,
    })
  })

  it('should return zeros for time difference if no time left', () => {
    const date = new Date(2022, 4, 27, 18, 12, 11, 0)
    jest.setSystemTime(date)

    const targetTime = {
      day: 5,
      hour: 18,
      minute: 0,
      second: 0,
    }
    const timeLeft = getTimeLeft(targetTime)
    expect(timeLeft).toMatchObject({
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
    })
  })
})

describe('isFinished', () => {
  it('should return true if no time left', () => {
    const timeLeft = {
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
    }
    expect(isFinished(timeLeft)).toBe(true)
  })

  it('should return false if time left', () => {
    const timeLeft = {
      day: 0,
      hour: 0,
      minute: 0,
      second: 1,
    }
    expect(isFinished(timeLeft)).toBe(false)
  })
})
