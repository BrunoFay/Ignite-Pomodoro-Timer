import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  nav {
    display: flex;
    gap: 0.5rem;
  }
  button {
    background-color: transparent;
    border-style: none;
    &:focus {
      color: ${(props) => props.theme['green-500']};
    }
  }
  a,
  button {
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.theme['color-body']};
    border-bottom: 3px solid transparent;
    border-top: 3px solid transparent;
    border-radius: 3px;
    transition: all 0.1s;
    &:hover {
      border-bottom: 3px solid ${(props) => props.theme['green-500']};
    }
    &.active {
      color: ${(props) => props.theme['green-500']};
    }
  }
`
