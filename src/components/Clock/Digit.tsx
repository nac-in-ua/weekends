type DigitProps = {
  digit: number
}

function Digit({ digit }: DigitProps) {
  return (
    <div className="flex h-20 items-center justify-center text-5xl font-thin">
      {digit}
    </div>
  )
}

export default Digit
