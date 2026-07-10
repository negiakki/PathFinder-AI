import generatePDF, { Resolution, Margin } from 'react-to-pdf'

/**
 * downloadReportAsPDF — captures the rendered Career Report (Analysis page)
 * and saves it as a PDF, entirely client-side.
 */
export function downloadReportAsPDF(reportRef, careerTitle) {
  const filename = `PathFinder-AI-Report-${(careerTitle || 'Career').replace(/\s+/g, '-')}.pdf`
  return generatePDF(reportRef, {
    method: 'save',
    filename,
    resolution: Resolution.MEDIUM,
    page: { margin: Margin.MEDIUM },
  })
}
