import { useState } from 'react'
import { Loader } from "./components/common/Loader";


function App() {
  const [loading, setLoading] = useState(true);
  return (
    <div className="h-screen w-screen overflow-hidden">
    <Loader loading={loading} setLoading={setLoading} />
    </div>
  )
}

export default App
