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
export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  color: ${(props) => props.theme['gray-100']};
  font-size: 1.125rem;
  font-weight: bold;
  .taskLabel {
    flex: 1;
  }
`
export const CountDownContainer = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 10rem;
  line-height: 8rem;
  color: ${(props) => props.theme['gray-100']};
  display: flex;
  gap: 1rem;
  span {
    background: ${(props) => props.theme['gray-700']};
    padding: 2rem 1rem;
    border-radius: 8px;
  }
`
export const Separator = styled.div`
  padding: 2rem 0;
  color: ${(props) => props.theme['green-500']};
  width: 4rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
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
const BaseInput = styled.input`
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
export const TaskInput = styled(BaseInput)`
  flex: 1;
  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`
export const MinutesAmountInput = styled(BaseInput)`
  width: 4rem;
`
