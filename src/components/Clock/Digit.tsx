type DigitProps = {
  digit: number
}

function Digit({ digit }: DigitProps) {
  return (
    <div
      data-testid="digit"
      className="flex h-20 items-center justify-center text-5xl font-thin"
    >
      {digit}
    </div>
  )
}

export default Digit
