import { useEffect, useState, useRef } from 'react'
import DropdownItemsList from './DropdownItemsList'

type DropdownProps = {
  value: string
  items: string[]
  label: string
  onChange: Function
}

function Dropdown({ label, items, value, onChange }: DropdownProps) {
  const dropdownMenu = useRef<HTMLDivElement>(null)

  const openClosedIcon = (isOpen: boolean) => (
    <svg
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      className={`mr-1 h-4 w-4 text-gray-500 ${isOpen ? 'rotate-180' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  )

  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(value)

  const handleSelectItem = (value: string) => {
    setSelectedValue(value)
    onChange(value)
    setIsOpen(false)
  }

  useEffect(() => {
    function handleIsClickOutside(event: { target: any }) {
      if (
        isOpen &&
        dropdownMenu.current &&
        !dropdownMenu.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleIsClickOutside, true)
    return () => {
      document.removeEventListener('mousedown', handleIsClickOutside, true)
    }
  }, [isOpen])

  return (
    <div className="flex flex-row items-center">
      <div className="mr-2 flex items-center justify-center">{label}</div>
      <div className="z-10 block" ref={dropdownMenu}>
        <button
          type="button"
          className="flex h-6 items-center justify-between rounded-md border border-slate-100 pl-2 text-base font-thin focus:border-slate-300 focus:outline-none dark:border-gray-700 dark:focus:border-gray-500"
          onClick={() => setIsOpen((oldState) => !oldState)}
        >
          {selectedValue}
          {openClosedIcon(isOpen)}
        </button>
        {isOpen && (
          <DropdownItemsList
            className="mt-1 max-h-28 w-28 cursor-pointer border border-gray-200 dark:border-gray-500"
            items={items}
            selectedValue={selectedValue}
            handleSelect={handleSelectItem}
          />
        )}
      </div>
    </div>
  )
}

export default Dropdown
