import { createContext, PropsWithChildren, useReducer, useState } from 'react'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}
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
interface CycleReducerState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export const cycleContext = createContext({} as CyclesContextValues)

export function CycleContextProvider({ children }: PropsWithChildren) {
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(5)
  const [cycleState, dispatch] = useReducer(
    (state: CycleReducerState, action: any) => {
      switch (action.type) {
        case 'ADD_NEW_CYCLE':
          return {
            ...state,
            cycles: [...state.cycles, action.payload.cycles],
            activeCycleId: action.payload.activeCycleId,
          }
        case 'INTERRUPT_CYCLE':
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === state.activeCycleId) {
                return { ...cycle, interruptedDate: new Date() }
              }
              return cycle
            }),
            activeCycleId: null,
          }
        case 'FINISH_CYCLE':
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === state.activeCycleId) {
                return { ...cycle, finishedDate: new Date() }
              }
              return cycle
            }),
            activeCycleId: null,
          }

        default:
          return state
      }
    },
    {
      cycles: [],
      activeCycleId: null,
    },
  )
  const { cycles, activeCycleId }: CycleReducerState = cycleState
  console.log(cycles)

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
    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: { cycles: newCycle, activeCycleId: id },
    })

    setSecondsPassed(0)
  }

  function interruptCycle() {
    dispatch({
      type: 'INTERRUPT_CYCLE',
    })
  }

  function finishCycle() {
    dispatch({
      type: 'FINISH_CYCLE',
    })
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
