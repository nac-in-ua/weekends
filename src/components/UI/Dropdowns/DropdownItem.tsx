import { useEffect, useRef } from 'react'

type DropdownItemProps = {
  handleSelect: Function
  value: string
  isSelected: boolean
}

function DropdownItem({ handleSelect, value, isSelected }: DropdownItemProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isSelected && ref.current) {
      ref.current.scrollIntoView()
    }
  }, [isSelected])

  return (
    <div
      ref={ref}
      onClick={(e) => handleSelect(e.currentTarget.getAttribute('data-value'))}
      data-value={value}
      data-testid="dropdown-item"
      className={`px-2 py-1 text-sm hover:bg-slate-200 dark:hover:bg-slate-700 ${
        isSelected ? 'font-regular' : 'font-thin'
      }`}
    >
      {value}
    </div>
  )
}

export default DropdownItem
