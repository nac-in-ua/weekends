import { MoonIcon, SunIcon } from '@heroicons/react/outline'
import { MouseEventHandler } from 'react'

type ToggleThemeProps = {
  isChecked: boolean
  onClick: MouseEventHandler<HTMLSpanElement>
}

function ToggleTheme({ isChecked, onClick }: ToggleThemeProps) {
  return (
    <div className="flex items-center justify-center">
      <span
        role="checkbox"
        aria-checked={isChecked}
        onClick={onClick}
        data-cy="theme-toggle"
        className={`flex h-8 w-16 flex-shrink-0 cursor-pointer items-center justify-between rounded-full ${
          isChecked ? 'bg-slate-700' : 'bg-gray-200'
        }`}
      >
        <MoonIcon
          className={`ml-1.5 h-5 w-5 rounded-full text-yellow-500 duration-300 ease-in-out ${
            isChecked ? '' : 'scale-0 opacity-0'
          }`}
        />
        <SunIcon
          className={`mr-1.5 h-5 w-5 rounded-full text-yellow-500 duration-300 ease-in-out ${
            isChecked ? 'scale-0 opacity-0' : ''
          }`}
        />
        <span
          className={`absolute ml-0.5 flex h-7 w-7 rounded-full text-yellow-500 shadow-md duration-300 ease-in-out ${
            isChecked ? 'translate-x-8 bg-slate-900' : 'bg-white'
          }`}
        ></span>
      </span>
    </div>
  )
}

export default ToggleTheme
