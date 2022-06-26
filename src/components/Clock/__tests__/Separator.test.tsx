import Separator from '../Separator'
import { render, screen } from '@testing-library/react'

describe('Separator', () => {
  it('should render with custom symbol', () => {
    render(<Separator symbol="::" />)
    const separator = screen.getByText(/::/i)
    expect(separator).toBeInTheDocument()
    expect(separator).toMatchSnapshot()
  })

  it('should render with default symbol', () => {
    render(<Separator />)
    const separator = screen.getByText(/:/i)
    expect(separator).toBeInTheDocument()
    expect(separator).toMatchSnapshot()
  })
})
