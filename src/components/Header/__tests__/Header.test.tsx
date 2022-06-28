import Header from '../Header'
import { render, screen } from '@testing-library/react'

jest.mock('../Settings', () => {
  return {
    __esModule: true,
    default: () => {
      return <div>Settings</div>
    },
  }
})

jest.mock('../DarkModeSwitcher', () => {
  return {
    __esModule: true,
    default: () => {
      return <div>Switcher</div>
    },
  }
})

describe('Header', () => {
  it('should render setting icon and theme switcher', () => {
    render(<Header />)
    expect(screen.getByText(/settings/i)).toBeInTheDocument()
    expect(screen.getByText(/switcher/i)).toBeInTheDocument()
  })

  it('should render header component', () => {
    render(<Header />)
    expect(screen.getByTestId('header')).toMatchSnapshot()
  })
})
