import { loadSettings, writeSettings } from '../dataAdapter'
import {
  writeToLocalstorage,
  readFromLocalstorage,
} from '../localstorageAdapter'

jest.mock('../localstorageAdapter')

type Theme = 'light' | 'dark'
interface IGetDefaultSettings {
  greetingsText: string
  day: number
  hour: number
  theme: Theme
  useSystemTheme: boolean
  isFirstLoad: boolean
}

describe('dataAdapter', () => {
  const handler = jest.fn()
  const mockedWriteToLocalstorage = jest.mocked(writeToLocalstorage)
  const mockedReadFromLocalstorage = jest.mocked(readFromLocalstorage)

  beforeEach(() => {
    mockedWriteToLocalstorage.mockImplementation(() => handler)
    mockedReadFromLocalstorage.mockImplementation(() =>
      btoa(
        JSON.stringify({
          day: 2,
          hour: 3,
          greetingsText: 'sample',
          theme: 'light',
          useSystemTheme: false,
          isFirstLoad: true,
        })
      )
    )
  })

  afterEach(() => {
    handler.mockClear()
    mockedWriteToLocalstorage.mockClear()
    mockedReadFromLocalstorage.mockClear()
  })

  it('should write settings', () => {
    const data: IGetDefaultSettings = {
      greetingsText: 'sample',
      day: 2,
      hour: 3,
      theme: 'dark',
      useSystemTheme: true,
      isFirstLoad: false,
    }
    writeSettings(data)
    expect(mockedWriteToLocalstorage).toHaveBeenCalledTimes(1)
  })

  it('should load settings', () => {
    const settings = loadSettings()
    expect(settings).toMatchObject({
      day: 2,
      hour: 3,
      greetingsText: 'sample',
      theme: 'light',
      useSystemTheme: false,
      isFirstLoad: true,
    })
    expect(mockedWriteToLocalstorage).not.toHaveBeenCalled()
    expect(mockedReadFromLocalstorage).toHaveBeenCalledTimes(1)
  })

  it('should load non existing settings', () => {
    mockedReadFromLocalstorage.mockImplementation(() => undefined)
    const settings = loadSettings()
    expect(settings).toMatchObject({
      day: 5,
      hour: 18,
      greetingsText: 'Have a beer!',
      theme: 'light',
      useSystemTheme: false,
      isFirstLoad: true,
    })
    expect(mockedWriteToLocalstorage).toHaveBeenCalledTimes(1)
    expect(mockedReadFromLocalstorage).toHaveBeenCalledTimes(1)
  })
})
