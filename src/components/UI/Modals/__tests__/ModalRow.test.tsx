import ModalRow from '../ModalRow'
import { render, screen } from '@testing-library/react'

describe('ModalRow', () => {
  it('should render row content', () => {
    const { container } = render(<ModalRow>some text</ModalRow>)
    expect(screen.getByText('some text')).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})
