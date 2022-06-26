import ReactDOM from 'react-dom'
import Button from '../Buttons/Button'
import Panel from '../Panels/Panel'
import { useRef, useEffect, ReactNode, MouseEventHandler } from 'react'

type ModalProps = {
  children: ReactNode
  title: string
  onApply: MouseEventHandler<HTMLButtonElement>
  onCancel?: Function
  isButtonsCentered?: boolean
  isHeadingCentered?: boolean
}

function Modal({
  children,
  title,
  onApply,
  onCancel,
  isButtonsCentered = false,
  isHeadingCentered = false,
}: ModalProps) {
  const el = useRef(document.createElement('div'))

  useEffect(() => {
    const modalRoot = document.getElementById('modal-root')
    const currentEl = el.current
    modalRoot && modalRoot.appendChild(currentEl)
    return () => {
      modalRoot && modalRoot.removeChild(currentEl)
    }
  }, [])

  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
    onCancel && onCancel()
  }

  const handleBackdropClick: MouseEventHandler<HTMLDivElement> = (): void => {
    onCancel && onCancel()
  }

  return ReactDOM.createPortal(
    <div className="relative z-10" role="dialog">
      <div
        className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm"
        onClick={handleBackdropClick}
      >
        <Panel size="xl">
          <div
            className={`mb-2 text-3xl font-thin text-slate-600 dark:border-b-zinc-600 dark:text-gray-400 ${
              isHeadingCentered ? 'text-center' : ''
            }`}
          >
            {title}
          </div>
          {children}
          <div
            className={`flex dark:border-t-zinc-600 ${
              isButtonsCentered ? 'justify-center' : 'justify-end'
            }`}
          >
            <Button onClick={onApply} title="Apply" />
            {onCancel && <Button onClick={handleButtonClick} title="Cancel" />}
          </div>
        </Panel>
      </div>
    </div>,
    el.current
  )
}

export default Modal
