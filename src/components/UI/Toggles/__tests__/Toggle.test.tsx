import Toggle from '../Toggle'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Toggle', () => {
  const clickHandler = jest.fn()

  beforeEach(() => {
    clickHandler.mockClear()
  })

  it('should render component with label', () => {
    const { container } = render(
      <Toggle label="sample label" isChecked={false} onClick={clickHandler} />
    )
    expect(container).toMatchSnapshot()
  })

  it('should render checked', () => {
    render(<Toggle isChecked={true} onClick={clickHandler} />)
    expect(screen.getByRole('checkbox')).toMatchSnapshot()
  })

  it('should render unchecked', () => {
    render(<Toggle isChecked={false} onClick={clickHandler} />)
    expect(screen.getByRole('checkbox')).toMatchSnapshot()
  })

  it('should handle click', async () => {
    render(<Toggle isChecked={true} onClick={clickHandler} />)
    await userEvent.click(screen.getByRole('checkbox'))
    expect(clickHandler).toHaveBeenCalledTimes(1)
  })
})
