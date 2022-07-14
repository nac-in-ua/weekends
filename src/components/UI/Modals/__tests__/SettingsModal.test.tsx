import SettingsModal from '../SettingsModal'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { useSettings } from '../../../../hooks/useSettings'

jest.mock('../../../../hooks/useSettings')

describe('SettingsModal', () => {
  const handleDispatch = jest.fn()
  const mockedUseSettings = jest.mocked(useSettings)
  const handleApply = jest.fn()
  const handleCancel = jest.fn()
  let scrollIntoViewMock = jest.fn()

  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock
  })

  beforeEach(() => {
    mockedUseSettings.mockImplementation(() => [
      {
        useSystemTheme: false,
        theme: 'light',
        greetingsText: 'sample greeting',
        day: 5,
        hour: 18,
        isFirstLoad: false,
      },
      handleDispatch,
    ])
  })

  afterEach(() => {
    scrollIntoViewMock.mockClear()
    handleDispatch.mockClear()
    mockedUseSettings.mockClear()
  })

  afterAll(() => {
    scrollIntoViewMock.mockRestore()
  })

  it('should be in the document', async () => {
    const modalRoot = document.createElement('div')
    modalRoot.setAttribute('id', 'modal-root')
    document.body.appendChild(modalRoot)

    render(<SettingsModal onApply={handleApply} onCancel={handleCancel} />)
    expect(screen.getByTestId('settings-modal')).toMatchSnapshot()
    document.body.removeChild(modalRoot)
  })

  it('should toggle switcher', async () => {
    const modalRoot = document.createElement('div')
    modalRoot.setAttribute('id', 'modal-root')
    document.body.appendChild(modalRoot)

    render(<SettingsModal onApply={handleApply} onCancel={handleCancel} />)
    const toggle = screen.getByRole('checkbox')
    userEvent.click(toggle)
    expect(toggle).toBeChecked()
    document.body.removeChild(modalRoot)
  })

  it('should handle Apply with new settings', () => {
    const modalRoot = document.createElement('div')
    modalRoot.setAttribute('id', 'modal-root')
    document.body.appendChild(modalRoot)

    render(<SettingsModal onApply={handleApply} onCancel={handleCancel} />)

    const greetingsTextInput = screen.getByPlaceholderText('Have a beer')
    userEvent.clear(greetingsTextInput)
    userEvent.type(greetingsTextInput, 'new greeting ')
    userEvent.click(screen.getByText('Friday'))
    userEvent.click(screen.getByText('Saturday'))
    userEvent.click(screen.getByText('18:00'))
    userEvent.click(screen.getByText('17:00'))
    userEvent.click(screen.getByRole('checkbox'))
    userEvent.click(screen.getByRole('button', { name: 'Apply' }))

    expect(handleDispatch).toHaveBeenCalledWith({
      type: 'setSettings',
      payload: {
        greetingsText: 'new greeting ',
        day: 6,
        hour: 17,
        useSystemTheme: true,
      },
    })
    expect(handleApply).toHaveBeenCalled()

    document.body.removeChild(modalRoot)
  })

  it('should not handle Apply when text is empty', () => {
    const modalRoot = document.createElement('div')
    modalRoot.setAttribute('id', 'modal-root')
    document.body.appendChild(modalRoot)

    render(<SettingsModal onApply={handleApply} onCancel={handleCancel} />)

    const greetingsTextInput = screen.getByPlaceholderText('Have a beer')
    userEvent.clear(greetingsTextInput)
    userEvent.type(greetingsTextInput, ' ')
    userEvent.click(screen.getByText('Friday'))
    userEvent.click(screen.getByText('Saturday'))
    userEvent.click(screen.getByText('18:00'))
    userEvent.click(screen.getByText('17:00'))
    userEvent.click(screen.getByRole('checkbox'))
    userEvent.click(screen.getByRole('button', { name: 'Apply' }))

    expect(handleDispatch).not.toHaveBeenCalled()
    expect(handleApply).not.toHaveBeenCalled()

    document.body.removeChild(modalRoot)
  })
})
