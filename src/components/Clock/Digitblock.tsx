import React from 'react'
import Digit from './Digit'
import Separator from './Separator'
import DigitLabel from './DigitLabel'

type DigitblockProps = {
  label: string
  digit: number
  separator?: string
}

function Digitblock({ label, digit, separator }: DigitblockProps) {
  return (
    <>
      <div className="flex w-24 flex-col">
        <DigitLabel label={label} />
        <Digit digit={digit} />
      </div>
      {separator && <Separator symbol={separator} />}
    </>
  )
}

export default React.memo(Digitblock)
