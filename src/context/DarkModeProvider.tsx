import React, { createContext, PropsWithChildren, useState } from 'react'
interface DarkModeContext {
  isDarkMode: boolean
  handleThemeMode: () => void
}
export const darkModeContext = createContext({} as DarkModeContext)

export default function DarkModeProvider({ children }: PropsWithChildren) {
  const [isDarkMode, setIsDarMode] = useState(true)
  function handleThemeMode() {
    setIsDarMode(!isDarkMode)
  }
  const valueToProvide = {
    handleThemeMode,
    isDarkMode,
  }
  return (
    <darkModeContext.Provider value={valueToProvide}>
      {children}
    </darkModeContext.Provider>
  )
}
