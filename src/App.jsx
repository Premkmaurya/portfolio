import { useState } from 'react'
import { Loader } from "./components/common/Loader";
import Hero from './components/sections/Hero';


function App() {
  const [loading, setLoading] = useState(true);
  return (
    <div className="h-screen w-screen overflow-hidden">
    <Loader loading={loading} setLoading={setLoading} />
    <Hero loading={loading} />
    </div>
  )
}

export default App
