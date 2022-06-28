import Digitblock from '../Digitblock'
import { render, screen } from '@testing-library/react'

describe('Digitblock', () => {
  it('should render with digit, label and separator', () => {
    const { container } = render(
      <Digitblock label="my label" digit={12} separator=":" />
    )
    const label = screen.getByText(/my label/i)
    const digit = screen.getByText('12')
    const separator = screen.getByText(':')
    expect(label).toBeInTheDocument()
    expect(digit).toBeInTheDocument()
    expect(separator).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
  it('should render without separator', () => {
    const { container } = render(<Digitblock label="my label" digit={12} />)
    const separator = screen.queryByTestId('separator')
    expect(separator).not.toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})
