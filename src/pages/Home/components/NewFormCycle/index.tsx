import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { cycleContext } from '../../../../context/CycleContextProvider'
import { FormContainer, MinutesAmountInput, TaskInput } from './style'

export default function NewFormCycle() {
  const { activeCycle } = useContext(cycleContext)
  const { register } = useFormContext()
  return (
    <FormContainer>
      <label htmlFor="taskInput">Vou trabalhar em:</label>
      <TaskInput
        disabled={!!activeCycle}
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
          disabled={!!activeCycle}
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
  )
}
