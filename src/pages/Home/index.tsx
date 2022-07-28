import { Play } from 'phosphor-react'
import React from 'react'
import {
  CountDownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separathor,
  StartCountDown,
  TaskInput,
} from './styles'

export default function Home() {
  return (
    <HomeContainer>
      <form>
        <FormContainer>
          <label htmlFor="taskInput">Vou trabalhar em:</label>
          <TaskInput
            list="task-suggestions"
            id="taskInput"
            placeholder="De um nome para o seu projeto"
            type="text"
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
            />
            minutos.
          </label>
        </FormContainer>
        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <Separathor>:</Separathor>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>
        <StartCountDown type="submit">
          <Play size={24} />
          Começar
        </StartCountDown>
      </form>
    </HomeContainer>
  )
}
