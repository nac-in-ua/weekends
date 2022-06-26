import TextInput from '../TextInput'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('TextInput', () => {
  const changeHandler = jest.fn()

  beforeEach(() => {
    changeHandler.mockClear()
  })

  it('should render valid', () => {
    render(
      <TextInput
        placeholder="sample placeholder"
        value="sample"
        onChange={changeHandler}
      />
    )
    expect(screen.getByTestId('greetings-text-input')).toMatchSnapshot()
  })

  it('should render invalid', async () => {
    render(
      <TextInput
        placeholder="sample placeholder"
        value="sample"
        onChange={changeHandler}
      />
    )
    const input = screen.getByTestId('greetings-text-input')
    await userEvent.clear(input)
    expect(input).toMatchSnapshot()
    await userEvent.type(input, '   ')
    expect(input).toMatchSnapshot()
  })

  it('should call change handler with typed value', async () => {
    render(
      <TextInput
        placeholder="sample placeholder"
        value="sample"
        onChange={changeHandler}
      />
    )
    const input = screen.getByTestId('greetings-text-input')
    await userEvent.clear(input)
    await userEvent.type(input, 'have a beer')
    expect(changeHandler).toHaveBeenCalledWith('have a beer')
  })
})
