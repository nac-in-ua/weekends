import Settings from '../Settings'
import { render, screen } from '@testing-library/react'
import { useSettings } from '../../../hooks/useSettings'
import userEvent from '@testing-library/user-event'

jest.mock('../../../hooks/useSettings')

describe('Settings component', () => {
  const handleApply = jest.fn()
  const mockedUseSettings = jest.mocked(useSettings)

  beforeAll(() => {
    const modalRoot = document.createElement('div')
    modalRoot.setAttribute('id', 'modal-root')
    document.body.appendChild(modalRoot)
  })

  beforeEach(() => {
    mockedUseSettings.mockImplementation(() => [
      {
        greetingsText: 'sample',
        day: 5,
        hour: 18,
        theme: 'light',
        useSystemTheme: false,
        isFirstLoad: false,
      },
      handleApply,
    ])
  })

  afterEach(() => {
    handleApply.mockClear()
    mockedUseSettings.mockClear()
  })

  it('should render settigns icon', () => {
    render(<Settings />)
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('should open settings modal', () => {
    render(<Settings />)
    userEvent.click(screen.getByRole('img'))
    const settingsModal = screen.getByRole('dialog')
    expect(settingsModal).toBeInTheDocument()
  })

  it('should close Settings Modal on Apply button click', () => {
    render(<Settings />)
    const settingsIcon = screen.getByRole('img')
    userEvent.click(settingsIcon)
    const applyButton = screen.getByRole('button', { name: /apply/i })
    userEvent.click(applyButton)
    expect(screen.queryByTestId('settings-modal')).not.toBeInTheDocument()
  })

  it('should call apply handler for settings provider on Apply button click', () => {
    render(<Settings />)
    const settingsIcon = screen.getByRole('img')
    userEvent.click(settingsIcon)
    const applyButton = screen.getByRole('button', { name: /apply/i })
    userEvent.click(applyButton)
    expect(handleApply).toHaveBeenCalledTimes(1)
  })

  it('should close Settings Modal on Cancel button click', () => {
    render(<Settings />)
    const settingsIcon = screen.getByRole('img')
    userEvent.click(settingsIcon)
    const cancelButton = screen.getByRole('button', { name: /cancel/i })
    userEvent.click(cancelButton)
    expect(screen.queryByTestId('settings-modal')).not.toBeInTheDocument()
  })

  it('should NOT call apply handler for settings provider on Cancel button click', () => {
    render(<Settings />)
    const settingsIcon = screen.getByRole('img')
    userEvent.click(settingsIcon)
    const cancelButton = screen.getByRole('button', { name: /cancel/i })
    userEvent.click(cancelButton)
    expect(handleApply).not.toHaveBeenCalled()
  })
})
