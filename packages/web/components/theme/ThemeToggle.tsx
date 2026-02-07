
'use client'

import React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import Button from '@/components/ui/Button'

const ThemeToggle: React.FC = () => {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Prevent hydration mismatch by only rendering after mount
  // next-themes sets theme on server as undefined, then resolves on client
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return placeholder with same dimensions to prevent layout shift
    return (
      <Button
        variant="text"
        size="md"
        iconOnly
        aria-label="Toggle theme"
        className="border border-outline-variant"
        disabled
      >
        <div className="h-5 w-5" />
      </Button>
    )
  }

  // Determine current effective theme (resolve 'system' to actual theme)
  const currentTheme = theme === 'system' ? systemTheme : theme

  const toggleTheme = () => {
    // Toggle between light and dark (always explicit, never 'system')
    setTheme(currentTheme === 'light' ? 'dark' : 'light')
  }

  return (
    <Button
      onClick={toggleTheme}
      variant="text"
      size="md"
      iconOnly
      leftIcon={
        currentTheme === 'light' ? (
          <Moon className="transition-transform duration-300" />
        ) : (
          <Sun className="transition-transform duration-300" />
        )
      }
      aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
      className="border border-outline-variant"
    />
  )
}

export default ThemeToggle
