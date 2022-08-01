import 'styled-components'
import { darkTheme, lightTheme } from '../styles/themes/default'
/* é feita a importação do styled components aqui para nao sobrescrever tudo da lib */

type ThemeType = typeof darkTheme | lightTheme
/* como sobrescrever um método especifico de dentro de uma lib */
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
