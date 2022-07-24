import DigitLabel from '../DigitLabel'
import { render, screen } from '@testing-library/react'

describe('DigitLabel', () => {
  it('should render label', () => {
    const { container } = render(<DigitLabel label="my label" />)
    const label = screen.getByText(/my label/i)
    expect(label).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})
