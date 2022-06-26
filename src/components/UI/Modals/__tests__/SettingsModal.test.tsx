import SettingsModal from '../SettingsModal'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

type Theme = 'light' | 'dark'

interface ISettings {
  greetingsText: string
  day: number
  hour: number
  theme: Theme
  useSystemTheme: boolean
  isFirstLoad: boolean
}

describe('SettingsModal', () => {
  const handleApply = jest.fn()
  const handleCancel = jest.fn()
  let scrollIntoViewMock = jest.fn()

  const settings: ISettings = {
    useSystemTheme: false,
    theme: 'light',
    greetingsText: 'sample greeting',
    day: 5,
    hour: 18,
    isFirstLoad: false,
  }

  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock
  })

  afterEach(() => {
    scrollIntoViewMock.mockClear()
  })

  afterAll(() => {
    scrollIntoViewMock.mockRestore()
  })

  it('should be in the document', async () => {
    const modalRoot = document.createElement('div')
    modalRoot.setAttribute('id', 'modal-root')
    document.body.appendChild(modalRoot)
    render(
      <SettingsModal
        settings={settings}
        title="sample title"
        onApply={handleApply}
        onCancel={handleCancel}
      />
    )
    expect(screen.getByTestId('settings-modal')).toMatchSnapshot()
    document.body.removeChild(modalRoot)
  })

  it('should toggle switcher', async () => {
    const modalRoot = document.createElement('div')
    modalRoot.setAttribute('id', 'modal-root')
    document.body.appendChild(modalRoot)
    render(
      <SettingsModal
        settings={settings}
        title="sample title"
        onApply={handleApply}
        onCancel={handleCancel}
      />
    )
    const toggle = screen.getByRole('checkbox')
    await userEvent.click(toggle)
    expect(toggle).toBeChecked()
    document.body.removeChild(modalRoot)
  })

  it('should handle Apply with new settings', async () => {
    const modalRoot = document.createElement('div')
    modalRoot.setAttribute('id', 'modal-root')
    document.body.appendChild(modalRoot)
    render(
      <SettingsModal
        settings={settings}
        title="sample title"
        onApply={handleApply}
        onCancel={handleCancel}
      />
    )

    const greetingsTextInput = screen.getByPlaceholderText('Have a beer')
    await userEvent.clear(greetingsTextInput)
    await userEvent.type(greetingsTextInput, 'new greeting')
    await userEvent.click(screen.getByText('Friday'))
    await userEvent.click(screen.getByText('Saturday'))
    await userEvent.click(screen.getByText('18:00'))
    await userEvent.click(screen.getByText('17:00'))
    await userEvent.click(screen.getByRole('checkbox'))
    await userEvent.click(screen.getByRole('button', { name: 'Apply' }))
    expect(handleApply).toHaveBeenCalledWith({
      greetingsText: 'new greeting',
      day: 6,
      hour: 17,
      useSystemTheme: true,
    })
    document.body.removeChild(modalRoot)
  })
})
