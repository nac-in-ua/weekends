import Header from './components/Header/Header'
import { Description, Footer, Greetings } from './components/Main'
import Timer from './components/Main/Timer'
import { useState, useEffect } from 'react'
import { applyTheme } from './utils/settings'
import { useSettingsData } from './store/Settings'

function App() {
  const [isFinished, setIsFinished] = useState(false)
  const settings = useSettingsData()
  // const dispatch = useSettingsDispatch()
  const [isFirstLoad] = useState(settings.isFirstLoad)

  // const handleInitialSettings = (data) => {
  //   setIsFirstLoad(false)
  //   dispatch({
  //     type: 'set',
  //     payload: { ...data, isFirstLoad: false },
  //   })
  // }

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
      </main>
      <Footer />
    </div>
  )
}

export default App
