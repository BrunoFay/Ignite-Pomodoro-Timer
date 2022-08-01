import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
:focus{
  outline: 0;
  box-shadow: 0 0 0 2px ${(props) => props.theme['green-500']};
}

body{
  background: ${(props) => props.theme['bg-body']};
  color: ${(props) => props.theme['color-body']};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;
}

body,input,textarea,button {
 font-family: 'Roboto', sans-serif;
 font-weight: 400;
 font-size: 1rem;
}
`
