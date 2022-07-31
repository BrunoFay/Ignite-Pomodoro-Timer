import { differenceInSeconds } from 'date-fns'
import {
  createContext,
  PropsWithChildren,
  useEffect,
  useReducer,
  useState,
} from 'react'
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
  tasksAlreadyUsed: string[]
  activeCycleId: string | null
  activeCycle: Cycle | undefined
  amountSecondsPassed: number
  setSecondsPassed: (s: number) => void
  interruptCycle: () => void
  finishCycle: () => void
  createNewCycle: (data: NewCycleData) => void
}

export const cycleContext = createContext({} as CyclesContextValues)
const INITIAL_CYCLE_STATE_USEREDUCER = {
  cycles: [],
  activeCycleId: null,
  tasksAlreadyUsed: [],
}
export function CycleContextProvider({ children }: PropsWithChildren) {
  /* terceiro paremetro do useReducer é uma função disparada assim que o reducer é criado para recuperar os dados do reducer de outro lugar (API ou LocalStorage) */

  const [cycleState, dispatch] = useReducer(
    cyclesReducer,
    INITIAL_CYCLE_STATE_USEREDUCER,
    () => {
      const cyclesInLocalStorage = localStorage.getItem(
        '@Ignite-timer-cycleState-1.0.0',
      )
      if (cyclesInLocalStorage) {
        return JSON.parse(cyclesInLocalStorage)
      }
      return INITIAL_CYCLE_STATE_USEREDUCER
    },
  )
  console.log(cycleState)

  const { cycles, activeCycleId, tasksAlreadyUsed } = cycleState

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }
    return 5
  })

  useEffect(() => {
    const cyclesStateToString = JSON.stringify(cycleState)
    localStorage.setItem('@Ignite-timer-cycleState-1.0.0', cyclesStateToString)
  }, [cycleState])

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
    tasksAlreadyUsed,
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
