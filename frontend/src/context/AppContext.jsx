import { createContext, useContext, useState } from 'react'

/**
 * AppContext — central state for the PathFinder AI session.
 *
 * Stores:
 *  - answers:      { [questionId]: value }  collected during the assessment
 *  - report:       the structured JSON returned by the backend
 *  - isLoading:    true while the AI request is in flight
 *  - error:        friendly error message if the AI request fails
 */
const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [answers, setAnswers]     = useState({})
  const [report, setReport]       = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError]         = useState(null)

  function saveAnswer(questionId, value) {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  function resetSession() {
    setAnswers({})
    setReport(null)
    setIsLoading(false)
    setError(null)
  }

  return (
    <AppContext.Provider value={{
      answers,
      report,
      isLoading,
      error,
      saveAnswer,
      setReport,
      setIsLoading,
      setError,
      resetSession,
    }}>
      {children}
    </AppContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAppContext() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppContext must be used inside AppProvider')
  return ctx
}
