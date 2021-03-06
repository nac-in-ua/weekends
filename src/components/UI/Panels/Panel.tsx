import { ReactNode } from 'react'

type PanelProps = {
  children: ReactNode
  size?: string
}

function Panel({ children, size = 'sm' }: PanelProps) {
  return (
    <div
      className={`max-w-${size} mx-auto rounded-xl bg-white p-4 shadow-md dark:bg-zinc-900`}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  )
}

export default Panel
