import { loadSettings, writeSettings } from '../dataAdapter'
import {
  writeToLocalstorage,
  readFromLocalstorage,
} from '../localstorageAdapter'

jest.mock('../localstorageAdapter', () => {
  const originalModule = jest.requireActual('../localstorageAdapter')
  return {
    __esModule: true,
    ...originalModule,
    writeToLocalstorage: jest.fn(),
    readFromLocalstorage: jest.fn(() =>
      JSON.stringify({
        day: 2,
        hour: 3,
        greetingsText: '',
        theme: '',
        useSystemTheme: false,
        isFirstLoad: true,
      })
    ),
  }
})

const mockedWriteToLocalstorage = jest.mocked(writeToLocalstorage)
const mockedReadFromLocalstorage = jest.mocked(readFromLocalstorage)

describe('dataAdapter', () => {
  beforeEach(() => {
    mockedWriteToLocalstorage.mockClear()
    mockedReadFromLocalstorage.mockClear()
  })

  it('should write settings', () => {
    const data = {
      day: 2,
      hour: 3,
      greetingsText: '',
      theme: '',
      useSystemTheme: true,
      isFirstLoad: false,
    }
    writeSettings(data)
    expect(mockedWriteToLocalstorage).toHaveBeenCalledTimes(1)
  })

  it('should load settings', () => {
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
