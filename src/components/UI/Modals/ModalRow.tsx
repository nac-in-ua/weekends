import { ReactNode } from 'react'

type ModalRowProps = {
  children: ReactNode
}

function ModalRow({ children }: ModalRowProps) {
  return (
    <div className="my-1 flex items-center justify-start gap-5">{children}</div>
  )
}

export default ModalRow
