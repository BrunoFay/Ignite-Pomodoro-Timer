import { createContext, PropsWithChildren, useReducer, useState } from 'react'
import {
  createNewCycleAction,
  finishCycleAction,
  interruptCycleAction,
} from '../reducers/cycles/actions'
import { Cycle, cyclesReducer } from '../reducers/cycles/cycleReducer'

interface NewCycleData {
  task: string
  minutesAmount: number
}
interface CyclesContextValues {
  cycles: Cycle[]
  activeCycleId: string | null
  activeCycle: Cycle | undefined
  amountSecondsPassed: number
  setSecondsPassed: (s: number) => void
  interruptCycle: () => void
  finishCycle: () => void
  createNewCycle: (data: NewCycleData) => void
}

export const cycleContext = createContext({} as CyclesContextValues)

export function CycleContextProvider({ children }: PropsWithChildren) {
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(5)
  const [cycleState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  })
  const { cycles, activeCycleId } = cycleState

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }
  function createNewCycle(data: NewCycleData) {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      minutesAmount: data.minutesAmount,
      task: data.task,
      startDate: new Date(),
    }
    dispatch(createNewCycleAction(newCycle, id))

    setSecondsPassed(0)
  }

  function interruptCycle() {
    dispatch(interruptCycleAction())
  }

  function finishCycle() {
    dispatch(finishCycleAction())
  }

  const valueToProvide = {
    cycles,
    activeCycleId,
    activeCycle,
    amountSecondsPassed,
    setSecondsPassed,
    interruptCycle,
    finishCycle,
    createNewCycle,
  }
  return (
    <cycleContext.Provider value={valueToProvide}>
      {children}
    </cycleContext.Provider>
  )
}
