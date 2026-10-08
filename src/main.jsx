import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Works from './pages/AllWork.jsx'
import WorkDetail from './pages/WorkDetail.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/works" element={<Works />} />
        <Route path="/works/:slug" element={<WorkDetail />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)