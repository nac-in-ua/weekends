import { MouseEventHandler } from 'react'

type ToggleProps = {
  label?: string
  isChecked: boolean
  onClick: MouseEventHandler<HTMLSpanElement>
}

function Toggle({ label, isChecked, onClick }: ToggleProps) {
  return (
    <label className="flex items-center px-1 text-xl font-thin text-slate-600 dark:text-gray-400">
      {label}
      <span
        role="checkbox"
        onClick={onClick}
        aria-checked={isChecked}
        className={`ml-4 flex h-6 w-12 flex-shrink-0 items-center justify-between rounded-full px-1 duration-300 ease-in-out ${
          isChecked
            ? 'bg-green-400 dark:bg-green-600'
            : 'bg-gray-200 dark:bg-slate-700'
        }`}
      >
        <span
          className={`absolute flex h-5 w-5 rounded-full bg-white text-yellow-500 shadow-md duration-300 ease-in-out dark:bg-slate-900 ${
            isChecked ? 'translate-x-5' : ''
          }`}
        ></span>
      </span>
    </label>
  )
}

export default Toggle
