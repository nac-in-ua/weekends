import Dropdown from '../Dropdown'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Dropdown', () => {
  const handleChage = jest.fn()
  let mockedScrollIntoView = jest.fn()

  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = mockedScrollIntoView
  })

  beforeEach(() => {
    handleChage.mockClear()
  })

  afterEach(() => {
    mockedScrollIntoView.mockClear()
  })

  afterAll(() => {
    mockedScrollIntoView.mockRestore()
  })

  it('should render closed', () => {
    render(
      <Dropdown
        label="sample label"
        items={['first', 'second', 'third']}
        onChange={handleChage}
        value={'second'}
      />
    )
    const dropdown = screen.getByText('sample label')
    expect(dropdown).toMatchSnapshot()
  })

  it('should render opened', async () => {
    const { container } = render(
      <Dropdown
        label="sample label"
        items={['first', 'second', 'third']}
        onChange={handleChage}
        value={'second'}
      />
    )
    userEvent.click(screen.getByRole('button'))
    expect(container).toMatchSnapshot()
  })

  it('should render closed on click outside', async () => {
    const { container } = render(
      <Dropdown
        label="sample label"
        items={['first', 'second', 'third']}
        onChange={handleChage}
        value={'second'}
      />
    )
    userEvent.click(screen.getByRole('button'))
    userEvent.click(document.body)
    expect(container).toMatchSnapshot()
  })

  it('should change selected value', async () => {
    render(
      <Dropdown
        label="sample label"
        items={['first', 'second', 'third']}
        onChange={handleChage}
        value={'second'}
      />
    )
    const dropdownElement = screen.getByRole('button')
    userEvent.click(dropdownElement)
    userEvent.click(screen.getByText('third'))
    expect(dropdownElement).toHaveTextContent('third')
  })

  it('should trigget onChange handler with appropriate value', async () => {
    render(
      <Dropdown
        label="sample label"
        items={['first', 'second', 'third']}
        onChange={handleChage}
        value={'second'}
      />
    )
    userEvent.click(screen.getByRole('button'))
    userEvent.click(screen.getByText('third'))
    expect(handleChage).toHaveBeenCalledTimes(1)
    expect(handleChage).toHaveBeenCalledWith('third')
  })

  it('should close dropdown on value select', async () => {
    render(
      <Dropdown
        label="sample label"
        items={['first', 'second', 'third']}
        onChange={handleChage}
        value={'second'}
      />
    )
    userEvent.click(screen.getByRole('button'))
    userEvent.click(screen.getByText('third'))
    screen
      .queryAllByTestId('dropdown-item')
      .forEach((item) => expect(item).not.toBeInTheDocument())
  })

  it('should rotate arrow when opened', async () => {
    render(
      <Dropdown
        label="sample label"
        items={['first', 'second', 'third']}
        onChange={handleChage}
        value={'second'}
      />
    )
    const arrow = screen.getByRole('img')
    expect(arrow).toMatchSnapshot()
    userEvent.click(screen.getByRole('button'))
    expect(arrow).toMatchSnapshot()
  })
})
