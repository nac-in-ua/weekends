import SettingsIcon from '../SettingsIcon'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('SettingsIcon', () => {
  const handleClick = jest.fn()
  beforeEach(() => {
    handleClick.mockClear()
  })

  it('should render', () => {
    render(<SettingsIcon onClick={handleClick} />)
    const icon = screen.getByRole('img')
    expect(icon).toBeInTheDocument()
    expect(icon).toMatchSnapshot()
  })
  it('should handle click', async () => {
    render(<SettingsIcon onClick={handleClick} />)
    const icon = screen.getByRole('img')
    userEvent.click(icon)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
