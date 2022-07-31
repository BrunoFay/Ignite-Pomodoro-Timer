import styled from 'styled-components'

export const HomeContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`

export const BaseCountDownBtn = styled.button`
  border: solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  padding: 1rem 2.5rem;
  color: ${(props) => props.theme['gray-100']};
  border-radius: 8px;
  gap: 0.5rem;
  width: 100%;
  transition: all 0.1s;
  cursor: pointer;
`
export const StartCountDown = styled(BaseCountDownBtn)`
  background-color: ${(props) => props.theme['green-500']};
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  &:not(:disabled):hover {
    background-color: ${(props) => props.theme['green-700']};
  }
`
export const StopCountDown = styled(BaseCountDownBtn)`
  background-color: ${(props) => props.theme['red-500']};

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme['red-700']};
  }
`

/* herança de css com style component. inherit serve para pegar o valor da mesma propriedade designada ao pai */
export const BaseInput = styled.input`
  background: transparent;
  height: 2.5rem;
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme['gray-500']};
  font-weight: inherit;
  padding: 0 0.5rem;
  color: ${(props) => props.theme['gray-100']};
  transition: all 0.1s;
  &:focus {
    box-shadow: none;
    border-bottom: 2px solid ${(props) => props.theme['green-500']};
  }
  &:disabled {
    cursor: not-allowed;
  }
`
