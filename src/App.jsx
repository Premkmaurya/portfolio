import { useEffect, useRef, useState } from 'react'
import { Loader } from './components/common/Loader'
import Hero from './components/sections/Hero'
import About from './components/sections/About'

function App() {
  const [loading, setLoading] = useState(true)
  const scrollRef = useRef(null)

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const handleWheel = (event) => {
      if (Math.abs(event.deltaY) < Math.abs(event.deltaX)) return

      event.preventDefault()
      container.scrollLeft += event.deltaY
    }

    container.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      container.removeEventListener('wheel', handleWheel)
    }
  }, [])

  return (
    <div className="h-full flex bg-[#262220]">
      <Loader loading={loading} setLoading={setLoading} />
      {!loading && (
        <div ref={scrollRef} className="horizontal-scroll min-h-screen">
          <Hero loading={loading} />
          <About />
        </div>
      )}
    </div>
  )
}

export default App
