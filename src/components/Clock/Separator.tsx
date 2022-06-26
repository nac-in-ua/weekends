type SeparatorProps = {
  symbol?: string
}

function Separator({ symbol = ':' }: SeparatorProps) {
  return (
    <div className="mt-8 flex items-center justify-center pb-2 text-5xl">
      {symbol}
    </div>
  )
}

export default Separator
