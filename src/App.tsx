import 'uno.css'
import '@unocss/reset/tailwind.css'
import { GUI } from './components/gui'
import { QslashStore } from './store'

function App() {
  const store = new QslashStore()
  return (
    <>
      <GUI store={store} />
    </>
  )
}

export default App
