import { Router } from './Router'
import { ThemeProvider } from 'styled-components'
import { darkTheme, lightTheme } from './styles/themes/default'
import { useContext } from 'react'
import { darkModeContext } from './context/DarkModeProvider'
import { GlobalStyle } from './styles/global'

function App() {
  const { isDarkMode } = useContext(darkModeContext)
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Router />
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default App
