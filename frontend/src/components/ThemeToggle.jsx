import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext.jsx'

/**
 * ThemeToggle — icon-only light/dark switch, reused in the Navbar
 * and as a floating control on the distraction-free Assessment flow.
 */
export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className={[
        'inline-flex items-center justify-center w-10 h-10 rounded-full',
        'text-text-secondary dark:text-gray-300 hover:text-text-primary dark:hover:text-white',
        'hover:bg-blue-50 dark:hover:bg-gray-800',
        'transition-all duration-smooth',
        className,
      ].join(' ')}
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
