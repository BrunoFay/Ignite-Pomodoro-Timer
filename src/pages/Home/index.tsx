import { Play } from 'phosphor-react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { differenceInSeconds } from 'date-fns'
import * as zod from 'zod'
import {
  CountDownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountDown,
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
}

export default function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { register, watch, handleSubmit, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      minutesAmount: 0,
      task: '',
    },
  })
  const getActiveCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  /* é usado o metodo differenceInSeconds de dentro da lib de date fns, para fazer a comparação do tempo atravéz das datas, pois setInterval e setTimeout nao são precisos, eles entragam estimativas do tempo colocado e isso varia através da ram do pc */
  useEffect(() => {
    let interval: number
    if (getActiveCycle) {
      interval = setInterval(() => {
        setAmountSecondsPassed(
          differenceInSeconds(new Date(), getActiveCycle.startDate),
        )
      }, 1000)
    }
    return () => {
      clearInterval(interval)
    }
  }, [getActiveCycle])

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

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <FormContainer>
          <label htmlFor="taskInput">Vou trabalhar em:</label>
          <TaskInput
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
        <StartCountDown type="submit" disabled={isSubmitDisable}>
          <Play size={24} />
          Começar
        </StartCountDown>
      </form>
    </HomeContainer>
  )
}
