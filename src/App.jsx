import { useEffect, useRef, useState } from 'react'
import { Loader } from './components/common/Loader'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import gsap from 'gsap'

function App() {
  const [loading, setLoading] = useState(true)
  const [reveal, setReveal] = useState(true)
  const revealRef = useRef(null)

  useEffect(() => {
    const container = revealRef.current
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

  useEffect(() => {
    if (loading) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: 'power3.out',
        },
      })

      tl.fromTo(
        revealRef.current,
        {
          yPercent: 100,
        },
        {
          yPercent: 0,
          duration: 1.1,
          ease: 'power3.inOut',
          onComplete: () => {
            setReveal(true)
          }
        }
      )
    }, revealRef)

    return () => ctx.revert()
  }, [loading])

  return (
    <div className="h-full flex bg-[#262220]">
      <Loader loading={loading} setLoading={setLoading} />
      {!loading && (
        <div ref={revealRef} className="horizontal-scroll min-h-screen absolute inset-0 z-30 flex min-w-screen">
          <Hero reveal={reveal} loading={loading} />
          <About />
        </div>
      )}
    </div>
  )
}

export default App
