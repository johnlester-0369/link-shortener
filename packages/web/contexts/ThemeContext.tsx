'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  isValidTheme,
  getInitialTheme,
  applyTheme,
  saveTheme,
  type Theme,
} from '@/utils/theme.util'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Initialize with 'light' to prevent SSR hydration mismatch
  const [theme, setThemeState] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  // Read theme from localStorage after component mounts (client-side only)
  useEffect(() => {
    setMounted(true)
    const initialTheme = getInitialTheme()
    setThemeState(initialTheme)
  }, [])

  // Apply theme to DOM whenever it changes
  useEffect(() => {
    if (!mounted) return
    applyTheme(theme)
    saveTheme(theme)
  }, [theme, mounted])

  /**
   * Set theme with validation
   */
  const setTheme = (newTheme: Theme) => {
    if (!isValidTheme(newTheme)) {
      console.error('⚠️ Invalid theme:', newTheme)
      return
    }
    setThemeState(newTheme)
  }

  const value: ThemeContextType = {
    theme,
    setTheme,
    isDark: theme === 'dark',
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
