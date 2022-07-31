import { zodResolver } from '@hookform/resolvers/zod'
import { HandPalm, Play } from 'phosphor-react'
import { useContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as zod from 'zod'
import { cycleContext } from '../../context/CycleContextProvider'
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
  const { activeCycle, createNewCycle, finishCycle, interruptCycle } =
    useContext(cycleContext)
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      minutesAmount: 5,
      task: '',
    },
  })
  const { watch, handleSubmit, reset } = newCycleForm

  const task = watch('task')
  const isSubmitDisable = !task

  function handleSubmitForm(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <FormProvider {...newCycleForm}>
          <NewFormCycle />
        </FormProvider>
        <CountDown handleFinishCycle={finishCycle} />
        {!activeCycle ? (
          <StartCountDown type="submit" disabled={isSubmitDisable}>
            <Play size={24} />
            Começar
          </StartCountDown>
        ) : (
          <StopCountDown onClick={interruptCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountDown>
        )}
      </form>
    </HomeContainer>
  )
}
