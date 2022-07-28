import { Scroll, Timer } from 'phosphor-react'
import { NavLink } from 'react-router-dom'
import igniteLogo from '../../assets/Logo.svg'
import { HeaderContainer } from './style'
export default function Header() {
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
      </nav>
    </HeaderContainer>
  )
}
