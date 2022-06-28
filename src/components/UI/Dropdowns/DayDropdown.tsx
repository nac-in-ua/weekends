import { getDay, DAYS } from '../../../utils/convertTime'
import Dropdown from './Dropdown'

type DayDropdownProps = {
  selectedValue: number
  onChange: Function
}

function DayDropdown({ selectedValue, onChange }: DayDropdownProps) {
  return (
    <Dropdown
      value={DAYS[selectedValue - 1]}
      items={DAYS}
      label="Day"
      onChange={(value: string) => onChange(getDay(value))}
    />
  )
}
export default DayDropdown
