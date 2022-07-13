import Clock from '../Clock'
import { render } from '@testing-library/react'

describe('Clock', () => {
  it('should render with all clock numbers and separators', () => {
    const { container } = render(
      <Clock time={{ day: 1, hour: 1, minute: 1, second: 1 }} />
    )
    expect(container).toMatchSnapshot()
  })

  it('should render with days, hours and minutes when hour is zero (0)', () => {
    const { container } = render(
      <Clock time={{ day: 1, hour: 0, minute: 1, second: 1 }} />
    )
    expect(container).toMatchSnapshot()
  })

  it('should render without days', () => {
    const { container } = render(
      <Clock time={{ day: 0, hour: 1, minute: 1, second: 1 }} />
    )
    expect(container).toMatchSnapshot()
  })

  it('should render without days and hours', () => {
    const { container } = render(
      <Clock time={{ day: 0, hour: 0, minute: 1, second: 1 }} />
    )
    expect(container).toMatchSnapshot()
  })

  it('should render without days, hours and minutes', () => {
    const { container } = render(
      <Clock time={{ day: 0, hour: 0, minute: 0, second: 1 }} />
    )
    expect(container).toMatchSnapshot()
  })
})
