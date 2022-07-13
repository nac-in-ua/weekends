import ToggleTheme from '../ToggleTheme'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('ToggleTheme', () => {
  const clickHandler = jest.fn()

  beforeEach(() => {
    clickHandler.mockClear()
  })

  it('should render checked', () => {
    const { container } = render(
      <ToggleTheme isChecked={true} onClick={clickHandler} />
    )
    expect(screen.getByRole('checkbox')).toBeChecked()
    expect(container).toMatchSnapshot()
  })

  it('should render unchecked', () => {
    const { container } = render(
      <ToggleTheme isChecked={false} onClick={clickHandler} />
    )
    expect(screen.getByRole('checkbox')).not.toBeChecked()
    expect(container).toMatchSnapshot()
  })

  it('should handle click', async () => {
    render(<ToggleTheme isChecked={true} onClick={clickHandler} />)
    userEvent.click(screen.getByRole('checkbox'))
    expect(clickHandler).toHaveBeenCalledTimes(1)
  })
})
