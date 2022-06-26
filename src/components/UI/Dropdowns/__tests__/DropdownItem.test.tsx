import DropdownItem from '../DropdownItem'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('DropdownItem', () => {
  const handleSelect = jest.fn()
  let scrollIntoViewMock = jest.fn()

  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock
  })

  beforeEach(() => {
    handleSelect.mockClear()
  })

  afterEach(() => {
    scrollIntoViewMock.mockClear()
  })

  afterAll(() => {
    scrollIntoViewMock.mockRestore()
  })

  it('should render dropdown item', () => {
    render(
      <DropdownItem
        value="sample"
        handleSelect={handleSelect}
        isSelected={true}
      />
    )
    expect(screen.getByTestId('dropdown-item')).toBeInTheDocument()
  })

  it('should render selected', () => {
    render(
      <DropdownItem
        value="sample"
        handleSelect={handleSelect}
        isSelected={true}
      />
    )
    expect(screen.getByTestId('dropdown-item')).toMatchSnapshot()
  })

  it('should render not selected', () => {
    render(
      <DropdownItem
        value="sample"
        handleSelect={handleSelect}
        isSelected={false}
      />
    )
    expect(screen.getByTestId('dropdown-item')).toMatchSnapshot()
  })

  it('should handle click', async () => {
    render(
      <DropdownItem
        value="sample"
        handleSelect={handleSelect}
        isSelected={true}
      />
    )
    await userEvent.click(screen.getByTestId('dropdown-item'))
    expect(handleSelect).toHaveBeenCalledTimes(1)
  })

  it('should pass value on click', async () => {
    render(
      <DropdownItem
        value="sample"
        handleSelect={handleSelect}
        isSelected={true}
      />
    )
    await userEvent.click(screen.getByTestId('dropdown-item'))
    expect(handleSelect).toHaveBeenCalledWith('sample')
  })

  it('should scroll into view on item render', () => {
    render(
      <DropdownItem
        value="sample"
        handleSelect={handleSelect}
        isSelected={true}
      />
    )
    expect(scrollIntoViewMock).toHaveBeenCalledTimes(1)
  })
})
