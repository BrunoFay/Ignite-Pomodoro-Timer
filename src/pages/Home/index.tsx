import { zodResolver } from '@hookform/resolvers/zod'
import { differenceInSeconds } from 'date-fns'
import { HandPalm, Play } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import {
  CountDownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountDown,
  StopCountDown,
  TaskInput,
} from './styles'

/* como fazer validação com o zod, e como editar mensagens para ser exibidas */
const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'A tarefa precisa ter pelo menos 1 caracter'),
  minutesAmount: zod
    .number()
    .min(5, 'o intervalo precisa ser de no minimo 5 minutos')
    .max(60, 'o intervalo precisa ser de no máximo 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>
interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export default function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(5)
  const getActiveCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const { register, watch, handleSubmit, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      minutesAmount: 5,
      task: '',
    },
  })

  function handleSubmitForm(data: NewCycleFormData) {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      minutesAmount: data.minutesAmount,
      task: data.task,
      startDate: new Date(),
    }

    setCycles((curr) => [...curr, newCycle])
    setActiveCycleId(id)

    setAmountSecondsPassed(0)
    reset()
  }

  function handleInterruptCycle() {
    const setInterruptedDateInCycle = cycles.map((cycle) => {
      if (cycle.id === activeCycleId) {
        return { ...cycle, interruptedDate: new Date() }
      }
      return cycle
    })
    setCycles(setInterruptedDateInCycle)
    setActiveCycleId(null)
  }

  function handleFinishCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        }
        return cycle
      }),
    )
    setActiveCycleId(null)
  }
  /* log para ver os erros de validação nos inputs
  console.log(formState.errors) formState vem de dentro do useForm
  */
  const task = watch('task')
  const isSubmitDisable = !task

  const totalSeconds = getActiveCycle ? getActiveCycle.minutesAmount * 60 : 0
  const currentSeconds = getActiveCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  /* padStart faz com que voce complete uma string com um valor, no primeiro parametro é o tamanho da string e no segundo é o valor que sera usado para preencher */
  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  /* é usado o metodo differenceInSeconds de dentro da lib de date fns, para fazer a comparação do tempo atravéz das datas, pois setInterval e setTimeout nao são precisos, eles entragam estimativas do tempo colocado e isso varia através da ram do pc */
  useEffect(() => {
    let interval: number
    if (getActiveCycle) {
      interval = setInterval(() => {
        const secondsDiff = differenceInSeconds(
          new Date(),
          getActiveCycle.startDate,
        )
        if (secondsDiff >= totalSeconds) {
          handleFinishCycle()
          clearInterval(interval)
          setAmountSecondsPassed(totalSeconds)
        } else {
          setAmountSecondsPassed(secondsDiff)
        }
      }, 1000)
    }
    return () => {
      clearInterval(interval)
    }
  }, [getActiveCycle])

  useEffect(() => {
    if (getActiveCycle) {
      document.title = `Pomodoro ${minutes} : ${seconds}`
    } else {
      document.title = `Pomodoro Timer`
    }
  }, [minutes, seconds, getActiveCycle])

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <FormContainer>
          <label htmlFor="taskInput">Vou trabalhar em:</label>
          <TaskInput
            disabled={!!getActiveCycle}
            list="task-suggestions"
            id="taskInput"
            placeholder="De um nome para o seu projeto"
            type="text"
            {...register('task')}
          />
          <datalist id="task-suggestions">
            <option>projeto 1</option>
            <option>projeto 2</option>
            <option>projeto 3</option>
            <option>projeto 4</option>
          </datalist>
          <label>
            Durante
            <MinutesAmountInput
              disabled={!!getActiveCycle}
              type="number"
              placeholder="00"
              step={5}
              min={5}
              max={60}
              {...register('minutesAmount', { valueAsNumber: true })}
            />
            minutos.
          </label>
        </FormContainer>
        <CountDownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountDownContainer>
        {!getActiveCycle ? (
          <StartCountDown type="submit" disabled={isSubmitDisable}>
            <Play size={24} />
            Começar
          </StartCountDown>
        ) : (
          <StopCountDown onClick={handleInterruptCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountDown>
        )}
      </form>
    </HomeContainer>
  )
}
