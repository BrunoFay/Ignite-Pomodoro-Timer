import 'styled-components'
import { defaultTheme } from '../styles/themes/default'
/* é feita a importação do styled components aqui para nao sobrescrever tudo da lib */
interface DefaultTheme {
  light: string
  dark: string
}
type ThemeType = typeof defaultTheme;
/* como sobrescrever um método especifico de dentro de uma lib */
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType { }
}