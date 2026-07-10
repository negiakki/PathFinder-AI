/**
 * api.js — all HTTP calls to the FastAPI backend.
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

/**
 * Check that the backend is reachable.
 * @returns {Promise<{ status: string }>}
 */
export async function healthCheck() {
  const res = await fetch(`${BASE_URL}/`)
  if (!res.ok) throw new Error('Backend health check failed')
  return res.json()
}

/**
 * Send the student's assessment answers to the backend
 * and receive a structured Career Analysis JSON.
 *
 * @param {Object} answers — the compiled assessment payload
 * @returns {Promise<Object>} — the career analysis object
 */
export async function analyzeAssessment(answers) {
  const res = await fetch(`${BASE_URL}/api/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answers }),
  })

  if (!res.ok) {
    const detail = await res.json().catch(() => ({}))
    throw new Error(detail?.detail || 'Unable to generate analysis right now. Please try again.')
  }

  return res.json()
}
