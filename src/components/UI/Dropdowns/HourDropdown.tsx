import { getHour, HOURS } from '../../../utils/convertTime'
import Dropdown from './Dropdown'

type HourDropdownProps = {
  selectedValue: number
  onChange: Function
}

function HourDropdown({ selectedValue, onChange }: HourDropdownProps) {
  return (
    <Dropdown
      value={HOURS[+selectedValue]}
      items={HOURS}
      label="Hour"
      onChange={(value: string) => onChange(getHour(value))}
    />
  )
}
export default HourDropdown
