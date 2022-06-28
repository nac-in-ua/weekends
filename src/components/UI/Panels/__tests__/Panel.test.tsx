import Panel from '../Panel'
import { render, screen } from '@testing-library/react'

describe('Panel', () => {
  it('should render content', () => {
    const { container } = render(<Panel>some content</Panel>)
    expect(screen.getByText('some content')).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it('should render with size', () => {
    const { container } = render(<Panel size="md">some content</Panel>)
    expect(container).toMatchSnapshot()
  })
})
