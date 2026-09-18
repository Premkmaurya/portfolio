import { useState } from 'react'
import { Loader } from './components/common/Loader'
import Hero from './components/sections/Hero'
import About from './components/sections/About'

function App() {
  const [loading, setLoading] = useState(true)

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#262220]">
      <Loader loading={loading} setLoading={setLoading} />
      {loading ? null : (
        <>
          <Hero loading={loading} />
          <About />
        </>
      )}
    </div>
  )
}

export default App
