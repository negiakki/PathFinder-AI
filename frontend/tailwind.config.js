/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // IBM Design Language palette (UI_SPEC.md)
        'ibm-blue':    '#0F62FE',
        'ibm-purple':  '#8A3FFC',
        'ibm-success': '#24A148',
        'ibm-warning': '#F1C21B',
        'ibm-error':   '#DA1E28',
        'text-primary':   '#161616',
        'text-secondary': '#6F6F6F',
        'surface':     '#F8FAFC',
        'border':      '#E5E7EB',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'card':     '20px',
        'question': '18px',
        'btn':      '14px',
        'input':    '14px',
      },
      maxWidth: {
        'page': '1280px',
      },
      transitionDuration: {
        'smooth': '250ms',
      },
    },
  },
  plugins: [],
}
