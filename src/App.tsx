import Header from './components/Header/Header'
import { Description, Footer, Greetings } from './components/Main'
import Timer from './components/Main/Timer'
import { useState, useEffect } from 'react'
import { applyTheme } from './utils/settings'
import { useSettings } from './hooks/useSettings'
import StartupModal from './components/UI/Modals/StartupModal'

function App() {
  const [isFinished, setIsFinished] = useState(false)
  const [settings] = useSettings()
  const { isFirstLoad } = settings

  useEffect(() => {
    applyTheme(settings.theme)
  }, [settings.theme])

  return (
    <div className="flex h-screen flex-col bg-white text-slate-600 dark:bg-zinc-900 dark:text-gray-400">
      <Header />
      <main className="mb-auto flex flex-col">
        <Description />
        {!isFinished && !isFirstLoad && <Timer onFinish={setIsFinished} />}
        {isFinished && <Greetings text={settings.greetingsText} />}
        {isFirstLoad && <StartupModal />}
      </main>
      <Footer />
    </div>
  )
}

export default App
