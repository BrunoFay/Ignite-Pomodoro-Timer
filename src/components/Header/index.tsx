import { Moon, Scroll, Sun, Timer } from 'phosphor-react'
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import igniteLogo from '../../assets/Logo.svg'
import { darkModeContext } from '../../context/DarkModeProvider'
import { HeaderContainer } from './style'
export default function Header() {
  const { isDarkMode, handleThemeMode } = useContext(darkModeContext)
  return (
    <HeaderContainer>
      <img src={igniteLogo} alt="" />
      <nav>
        <NavLink to="" title="timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="historico">
          <Scroll size={24} />
        </NavLink>
        <button type="button" onClick={handleThemeMode}>
          {!isDarkMode ? <Moon size={24} /> : <Sun size={24} />}
        </button>
      </nav>
    </HeaderContainer>
  )
}
