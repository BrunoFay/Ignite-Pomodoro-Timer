import { zodResolver } from '@hookform/resolvers/zod'
import { HandPalm, Play } from 'phosphor-react'
import { useContext, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as zod from 'zod'
import { Cycle, cycleContext } from '../../context/CycleContextProvider'
import CountDown from './components/CountDown'
import NewFormCycle from './components/NewFormCycle'
import { HomeContainer, StartCountDown, StopCountDown } from './styles'

/* como fazer validação com o zod, e como editar mensagens para ser exibidas */

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'A tarefa precisa ter pelo menos 1 caracter'),
  minutesAmount: zod
    .number()
    .min(5, 'o intervalo precisa ser de no minimo 5 minutos')
    .max(60, 'o intervalo precisa ser de no máximo 60 minutos'),
})

/* log para ver os erros de validação nos inputs
  console.log(formState.errors) formState vem de dentro do useForm
  */

export type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export default function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const {
    getActiveCycleId,
    activeCycleId,
    getActiveCycle,
    activeCycle,
    setSecondsPassed,
  } = useContext(cycleContext)
  getActiveCycle(cycles)
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      minutesAmount: 5,
      task: '',
    },
  })
  const { watch, handleSubmit, reset } = newCycleForm

  function handleSubmitForm(data: NewCycleFormData) {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      minutesAmount: data.minutesAmount,
      task: data.task,
      startDate: new Date(),
    }

    setCycles((curr) => [...curr, newCycle])
    getActiveCycleId(id)

    setSecondsPassed(0)
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
    getActiveCycleId(null)
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
    getActiveCycleId(null)
  }

  const task = watch('task')
  const isSubmitDisable = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <FormProvider {...newCycleForm}>
          <NewFormCycle />
        </FormProvider>
        <CountDown handleFinishCycle={handleFinishCycle} />
        {!activeCycle ? (
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
