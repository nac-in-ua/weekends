import GeneralPanel from '../../UI/Panels/GeneralPanel'
import DropdownItem from './DropdownItem'

type DropdownItemsListProps = {
  selectedValue: string
  className?: string
  items: Array<string>
  handleSelect: Function
}

function DropdownItemsList({
  items,
  selectedValue,
  handleSelect,
  className,
}: DropdownItemsListProps) {
  return (
    <GeneralPanel className={className}>
      {items.map((item, index) => (
        <DropdownItem
          key={index}
          value={item}
          handleSelect={handleSelect}
          isSelected={selectedValue === item}
        />
      ))}
    </GeneralPanel>
  )
}

export default DropdownItemsList
