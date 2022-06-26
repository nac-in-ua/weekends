import HourDropdown from '../HourDropdown'
import { render, screen } from '@testing-library/react'
describe('HourDropdown', () => {
  const handleChage = jest.fn()

  beforeEach(() => {
    handleChage.mockClear()
  })

  it('should render with Hours', () => {
    const { container } = render(
      <HourDropdown onChange={handleChage} selectedValue={3} />
    )
    expect(container).toMatchSnapshot()
  })

  it('should render with label Hour', () => {
    render(<HourDropdown onChange={handleChage} selectedValue={3} />)
    expect(screen.getByText('Hour')).toBeInTheDocument()
  })

  it('should render selected day value', () => {
    render(<HourDropdown onChange={handleChage} selectedValue={3} />)
    expect(screen.getByText(/03:00/i)).toBeInTheDocument()
  })
})
