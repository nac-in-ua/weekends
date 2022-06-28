import DayDropdown from '../DayDropdown'
import { render, screen } from '@testing-library/react'

describe('DayDropdown', () => {
  const handleChage = jest.fn()

  beforeEach(() => {
    handleChage.mockClear()
  })

  it('should render with Days', () => {
    const { container } = render(
      <DayDropdown onChange={handleChage} selectedValue={3} />
    )
    expect(container).toMatchSnapshot()
  })

  it('should render with label Day', () => {
    render(<DayDropdown onChange={handleChage} selectedValue={3} />)
    expect(screen.getByText('Day')).toBeInTheDocument()
  })

  it('should render selected day value', () => {
    render(<DayDropdown onChange={handleChage} selectedValue={3} />)
    expect(screen.getByText(/wednesday/i)).toBeInTheDocument()
  })
})
