import React from 'react'
import { Outlet } from 'react-router-dom'
import { LayoutContainer } from './styles'
/* a ideia por tras de criar layouts, é fazer com que componentes que nao mudem nao precisem ser recriados com a mudança de rota, tendo um comportamento meio 'statico'. Outlet tem o comportamento semelhande ao de children de dentro das propriedades de uma função */
export default function DefaultLayout() {
  return (
    <>
      <LayoutContainer>DefaultLayout</LayoutContainer>
      <Outlet />
    </>
  )
}
