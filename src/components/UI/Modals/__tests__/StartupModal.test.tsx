import StartupModal from '../StartupModal'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  useSettingsData,
  useSettingsDispatch,
} from '../../../../store/Settings'

jest.mock('../../../../store/Settings')

describe('StartupModal', () => {
  const handleDispatch = jest.fn()
  let scrollIntoViewMock = jest.fn()
  const mockedUseSettingsData = jest.mocked(useSettingsData)
  const mockedUseSettingsDispatch = jest.mocked(useSettingsDispatch)

  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock
  })

  beforeEach(() => {
    mockedUseSettingsData.mockImplementation(() => ({
      useSystemTheme: false,
      theme: 'light',
      greetingsText: 'sample',
      day: 5,
      hour: 18,
      isFirstLoad: false,
    }))
  })

  afterEach(() => {
    scrollIntoViewMock.mockClear()
    handleDispatch.mockClear()
    mockedUseSettingsData.mockClear()
    mockedUseSettingsDispatch.mockClear()
  })

  afterAll(() => {
    scrollIntoViewMock.mockRestore()
  })

  it('should be in the document', async () => {
    const modalRoot = document.createElement('div')
    modalRoot.setAttribute('id', 'modal-root')
    document.body.appendChild(modalRoot)

    render(<StartupModal />)
    expect(screen.getByTestId('startup-modal')).toMatchSnapshot()
    document.body.removeChild(modalRoot)
  })

  it('should handle Apply with new settings', async () => {
    mockedUseSettingsDispatch.mockImplementation(() => handleDispatch)

    const modalRoot = document.createElement('div')
    modalRoot.setAttribute('id', 'modal-root')
    document.body.appendChild(modalRoot)

    render(<StartupModal />)

    userEvent.click(screen.getByText('Friday'))
    userEvent.click(screen.getByText('Saturday'))
    userEvent.click(screen.getByText('18:00'))
    userEvent.click(screen.getByText('17:00'))
    userEvent.click(screen.getByRole('button', { name: 'Apply' }))
    expect(handleDispatch.mock.calls).toEqual([
      [
        {
          payload: { day: 6, hour: 17 },
          type: 'setInitialSettings',
        },
      ],
      [
        {
          payload: false,
          type: 'setFirstLoad',
        },
      ],
    ])
    document.body.removeChild(modalRoot)
  })
})
