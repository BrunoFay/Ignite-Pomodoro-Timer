import { differenceInSeconds } from 'date-fns'
import { useContext, useEffect } from 'react'
import { cycleContext } from '../../../../context/CycleContextProvider'
import { CountDownContainer, Separator } from './style'

export default function CountDown({
  handleFinishCycle,
}: {
  handleFinishCycle: () => void
}) {
  const { activeCycle, amountSecondsPassed, setSecondsPassed } =
    useContext(cycleContext)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  /* padStart faz com que voce complete uma string com um valor, no primeiro parametro é o tamanho da string e no segundo é o valor que sera usado para preencher */
  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  /* é usado o metodo differenceInSeconds de dentro da lib de date fns, para fazer a comparação do tempo atravéz das datas, pois setInterval e setTimeout nao são precisos, eles entragam estimativas do tempo colocado e isso varia através da ram do pc */

  useEffect(() => {
    let interval: number
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDiff = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        )
        if (secondsDiff >= totalSeconds) {
          handleFinishCycle()
          clearInterval(interval)
          setSecondsPassed(totalSeconds)
        } else {
          setSecondsPassed(secondsDiff)
        }
      }, 1000)
    }
    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds])

  useEffect(() => {
    if (activeCycle) {
      document.title = `Pomodoro ${minutes} : ${seconds}`
    } else {
      document.title = `Pomodoro Timer`
    }
  }, [minutes, seconds, activeCycle])
  return (
    <CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDownContainer>
  )
}
