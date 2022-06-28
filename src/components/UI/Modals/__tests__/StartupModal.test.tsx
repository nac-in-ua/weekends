import StartupModal from '../StartupModal'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('StartupModal', () => {
  const handleApply = jest.fn()
  let scrollIntoViewMock = jest.fn()

  const settings = {
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
      <StartupModal
        settings={settings}
        title="sample title"
        onApply={handleApply}
      />
    )
    expect(screen.getByTestId('startup-modal')).toMatchSnapshot()
    document.body.removeChild(modalRoot)
  })

  it('should handle Apply with new settings', async () => {
    const modalRoot = document.createElement('div')
    modalRoot.setAttribute('id', 'modal-root')
    document.body.appendChild(modalRoot)
    render(
      <StartupModal
        settings={settings}
        title="sample title"
        onApply={handleApply}
      />
    )

    await userEvent.click(screen.getByText('Friday'))
    await userEvent.click(screen.getByText('Saturday'))
    await userEvent.click(screen.getByText('18:00'))
    await userEvent.click(screen.getByText('17:00'))
    await userEvent.click(screen.getByRole('button', { name: 'Apply' }))
    expect(handleApply).toHaveBeenCalledWith({
      day: 6,
      hour: 17,
    })
    document.body.removeChild(modalRoot)
  })
})
