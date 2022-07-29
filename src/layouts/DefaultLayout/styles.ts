import styled from 'styled-components'

export const LayoutContainer = styled.div`
  box-sizing: border-box;
  max-width: 74rem;
  height: calc(100% - 10rem);
  margin: 5rem auto;
  background: ${(props) => props.theme['gray-800']};
  border-radius: 8px;
  display: flex;
  padding: 2.5rem;
  flex-direction: column;
`
