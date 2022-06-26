import DropdownItemsList from '../DropdownItemsList'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('DropdownItemsList', () => {
  const selectHandler = jest.fn()
  let mockedScrollIntoView = jest.fn()

  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = mockedScrollIntoView
  })

  beforeEach(() => {
    selectHandler.mockClear()
  })

  afterAll(() => {
    mockedScrollIntoView.mockReset()
  })

  it('should render dropdown items list', () => {
    const selectedValue = 'second'
    const { container } = render(
      <DropdownItemsList
        items={['first']}
        handleSelect={selectHandler}
        selectedValue={selectedValue}
      />
    )
    expect(container).toMatchSnapshot()
  })

  it('should render 3 dropdown items', () => {
    const selectedValue = 'second'
    render(
      <DropdownItemsList
        items={['first', 'second', 'third']}
        handleSelect={selectHandler}
        selectedValue={selectedValue}
      />
    )
    expect(screen.getAllByTestId('dropdown-item')).toHaveLength(3)
  })

  it('should handle select', async () => {
    const selectedValue = 'second'
    render(
      <DropdownItemsList
        items={['first', 'second', 'third']}
        handleSelect={selectHandler}
        selectedValue={selectedValue}
      />
    )
    await userEvent.click(screen.getByText('third'))
    expect(selectHandler).toHaveBeenCalledTimes(1)
  })

  it('should handle select with dropdown item value', async () => {
    const selectedValue = 'second'
    render(
      <DropdownItemsList
        items={['first', 'second', 'third']}
        handleSelect={selectHandler}
        selectedValue={selectedValue}
      />
    )
    await userEvent.click(screen.getByText('third'))
    expect(selectHandler).toHaveBeenCalledWith('third')
  })
})
