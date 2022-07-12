import Clock from '../Clock'
import { render } from '@testing-library/react'

describe('Clock', () => {
  it('should render with all clock numbers and separators', () => {
    const { container } = render(
      <Clock time={{ days: 1, hours: 1, minutes: 1, seconds: 1 }} />
    )
    expect(container).toMatchSnapshot()
  })

  it('should render with days, hours and minutes when hour is zero (0)', () => {
    const { container } = render(
      <Clock time={{ days: 1, hours: 0, minutes: 1, seconds: 1 }} />
    )
    expect(container).toMatchSnapshot()
  })

  it('should render without days', () => {
    const { container } = render(
      <Clock time={{ days: 0, hours: 1, minutes: 1, seconds: 1 }} />
    )
    expect(container).toMatchSnapshot()
  })

  it('should render without days and hours', () => {
    const { container } = render(
      <Clock time={{ days: 0, hours: 0, minutes: 1, seconds: 1 }} />
    )
    expect(container).toMatchSnapshot()
  })

  it('should render without days, hours and minutes', () => {
    const { container } = render(
      <Clock time={{ days: 0, hours: 0, minutes: 0, seconds: 1 }} />
    )
    expect(container).toMatchSnapshot()
  })
})
