import { useState, useCallback } from 'react'
import { questions9_10, questions11_12, commonQuestions } from '../pages/Assessment/questions.js'

/**
 * useAssessment — manages assessment flow state.
 *
 * Returns the current question, navigation helpers,
 * and a compiled answers object ready to send to the API.
 */
export function useAssessment(savedAnswers, saveAnswer) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Build the question list based on the class selected in the first answer.
  function getQuestions(answers) {
    const cls = answers?.current_class
    const specific = (cls === '9' || cls === '10') ? questions9_10 : questions11_12
    return [...commonQuestions, ...specific]
  }

  const questions = getQuestions(savedAnswers)
  const totalQuestions = questions.length
  const currentQuestion = questions[currentIndex] ?? null
  const isFirst = currentIndex === 0
  const isLast  = currentIndex === totalQuestions - 1
  const progress = totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0

  const goNext = useCallback(() => {
    setCurrentIndex(i => Math.min(i + 1, totalQuestions - 1))
  }, [totalQuestions])

  const goBack = useCallback(() => {
    setCurrentIndex(i => Math.max(i - 1, 0))
  }, [])

  return {
    currentIndex,
    currentQuestion,
    totalQuestions,
    progress,
    isFirst,
    isLast,
    goNext,
    goBack,
  }
}
