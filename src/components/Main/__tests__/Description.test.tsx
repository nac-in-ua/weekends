import Description from '../Description'
import { render, screen } from '@testing-library/react'

describe('Description', () => {
  it('should heading with text', () => {
    render(<Description />)
    const title = screen.getByRole('heading')
    expect(title).toHaveTextContent('weekends countdown')
  })

  it('should render heading', () => {
    render(<Description />)
    expect(screen.getByRole('heading')).toMatchSnapshot()
  })
})
