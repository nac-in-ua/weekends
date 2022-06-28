import Digit from './Digit'
import Separator from './Separator'

type DigitblockProps = {
  label: string
  digit: number
  separator?: string
}

function Digitblock({ label, digit, separator }: DigitblockProps) {
  return (
    <>
      <div className="flex w-24 flex-col">
        <div className="flex h-8 items-center justify-center text-lg font-thin uppercase">
          {label}
        </div>
        <Digit digit={digit} />
      </div>
      {separator && <Separator symbol={separator} />}
    </>
  )
}

export default Digitblock
