import Header from './components/Header/Header'
import { Description, Footer, Greetings } from './components/Main'
import Timer from './components/Main/Timer'

function App() {
  return (
    <div className="flex h-screen flex-col bg-white text-slate-600 dark:bg-zinc-900 dark:text-gray-400">
      <Header />
      <main className="mb-auto flex flex-col">
        <Description />
        <Timer />
        <Greetings text="have a beer!" />
      </main>
      <Footer />
    </div>
  )
}

export default App
