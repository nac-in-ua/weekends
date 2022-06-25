import Actiontext from '../Actiontext'
import { render, screen } from '@testing-library/react'

describe('Actiontext', () => {
  it('should heading with text', () => {
    render(<Actiontext />)
    const title = screen.getByRole('heading')
    expect(title).toHaveTextContent('Time left to weekends')
  })

  it('should render heading', () => {
    render(<Actiontext />)
    expect(screen.getByRole('heading')).toMatchSnapshot()
  })
})
