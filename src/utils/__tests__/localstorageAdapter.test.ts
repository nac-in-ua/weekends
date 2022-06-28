import {
  writeToLocalstorage,
  readFromLocalstorage,
} from '../localstorageAdapter'

describe('localstorage adapter', () => {
  let setItemSpy: any, getItemSpy: any, consoleError: any
  beforeAll(() => {
    setItemSpy = jest.spyOn(global.Storage.prototype, 'setItem')
    getItemSpy = jest.spyOn(global.Storage.prototype, 'getItem')
    consoleError = jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  beforeEach(() => {
    setItemSpy.mockImplementation(() => {})
    getItemSpy.mockImplementation(() => 'sample')
  })

  afterAll(() => {
    getItemSpy.mockRestore()
    setItemSpy.mockRestore()
    consoleError.mockRestore()
  })

  afterEach(() => {
    getItemSpy.mockClear()
    setItemSpy.mockClear()
    consoleError.mockClear()
  })

  it('should read settings from local storage', () => {
    const data = readFromLocalstorage('settings')
    expect(getItemSpy).toHaveBeenCalled()
    expect(getItemSpy).toHaveBeenCalledWith('settings')
    expect(data).toMatch('sample')
  })

  it('should write settings to local storage', () => {
    const data = JSON.stringify({ day: 2, hour: 3 })
    writeToLocalstorage('settings', data)
    expect(setItemSpy).toHaveBeenCalled()
    expect(setItemSpy).toHaveBeenCalledWith(
      'settings',
      JSON.stringify({ day: 2, hour: 3 })
    )
  })

  it('should show console error on reading from localstorage', () => {
    getItemSpy.mockImplementation(() => {
      throw Error('error message')
    })
    const data = readFromLocalstorage('settings')
    expect(getItemSpy).toHaveBeenCalledWith('settings')
    expect(data).toBeUndefined()
    expect(console.error).toHaveBeenCalledTimes(1)
  })

  it('should show console error on writing to localstorage', () => {
    setItemSpy.mockImplementation(() => {
      throw Error('error message')
    })
    const data = JSON.stringify({ day: 2, hour: 3 })
    writeToLocalstorage('settings', data)
    expect(setItemSpy).toHaveBeenCalled()
    expect(setItemSpy).toHaveBeenCalledWith(
      'settings',
      JSON.stringify({ day: 2, hour: 3 })
    )
    expect(console.error).toHaveBeenCalledTimes(1)
  })

  it('should read empty settings from local storage', () => {
    getItemSpy.mockImplementation(() => undefined)
    const data = readFromLocalstorage('settings')
    expect(data).toBe('')
  })
})
