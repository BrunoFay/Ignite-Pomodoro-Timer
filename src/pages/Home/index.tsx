import { Play } from 'phosphor-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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

export default function Home() {
  const { register, watch, handleSubmit, formState } = useForm({
    resolver: zodResolver(newCycleFormValidationSchema),
  })
  const task = watch('task')
  const isSubmitDisable = !task

  function handleSubmitForm() { }
  /* log para ver os erros de validação nos inputs
  console.log(formState.errors)
  */

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
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>
        <StartCountDown type="submit" disabled={isSubmitDisable}>
          <Play size={24} />
          Começar
        </StartCountDown>
      </form>
    </HomeContainer>
  )
}
