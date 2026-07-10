import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import LandingPage from './pages/LandingPage/index.jsx'
import Assessment from './pages/Assessment/index.jsx'
import Analysis from './pages/Analysis/index.jsx'
import Report from './pages/Report/index.jsx'

export default function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/"           element={<LandingPage />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/analysis"   element={<Analysis />} />
            <Route path="/report"     element={<Report />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </ThemeProvider>
  )
}
