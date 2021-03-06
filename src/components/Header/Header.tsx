import DarkModeSwitcher from './DarkModeSwitcher'
import Settings from './Settings'

function Header() {
  return (
    <header
      data-testid="header"
      className="my-2 mx-4 flex h-12 flex-row justify-between"
    >
      <Settings />
      <DarkModeSwitcher />
    </header>
  )
}

export default Header
