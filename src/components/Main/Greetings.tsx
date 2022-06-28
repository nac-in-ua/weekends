type GreetingsProps = {
  text: string
}

function Greetings({ text }: GreetingsProps) {
  return (
    <div className="mt-32 text-center text-7xl font-thin uppercase">{text}</div>
  )
}

export default Greetings
