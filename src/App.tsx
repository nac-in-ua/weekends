import Header from './components/Header/Header'
import { Description, Footer, Greetings } from './components/Main'
import Timer from './components/Main/Timer'
import { useState, useEffect } from 'react'
import { applyTheme } from './utils/settings'
import { useSettingsData, useSettingsDispatch } from './store/Settings'
import StartupModal from './components/UI/Modals/StartupModal'

type Settings = {
  greetingsText: string
  day: number
  hour: number
  useSystemTheme: boolean
}

function App() {
  const [isFinished, setIsFinished] = useState(false)
  const settings = useSettingsData()
  const dispatch = useSettingsDispatch()
  const [isFirstLoad, setIsFirstLoad] = useState(settings.isFirstLoad)

  const handleInitialSettings = (data: Settings) => {
    setIsFirstLoad(false)
    dispatch({
      type: 'set',
      payload: { ...data },
    })
    dispatch({
      type: 'setFirstLoad',
      payload: false,
    })
  }

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
        {isFirstLoad && (
          <StartupModal
            onApply={handleInitialSettings}
            settings={settings}
            title="Please choose"
          />
        )}
      </main>
      <Footer />
    </div>
  )
}

export default App
