import { ReactNode } from 'react'

type GeneralPanelProps = {
  children: ReactNode
  className?: string
}

GeneralPanel.defaultProps = {
  className: '',
}

function GeneralPanel({ children, className }: GeneralPanelProps) {
  return (
    <div
      className={`absolute overflow-auto rounded-md bg-white shadow-md dark:bg-zinc-900 ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  )
}

export default GeneralPanel
