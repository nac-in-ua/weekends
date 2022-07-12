import Footer from '../Footer'
import { render, screen } from '@testing-library/react'

describe('Footer', () => {
  it('should render link with text', () => {
    render(<Footer />)
    const footerLink = screen.getByRole('link')
    expect(footerLink).toBeInTheDocument()
    expect(footerLink).toMatchSnapshot()
  })
  it('should has attributes', () => {
    render(<Footer />)
    const footerLink = screen.getByRole('link')
    expect(footerLink).toHaveAttribute('href', 'mailto: nac.in.ua@gmail.com')
  })
})
