import { createContext, PropsWithChildren, useEffect, useState } from 'react'

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
  activeCycleId: string | null
  activeCycle: Cycle | undefined
  catchActiveCycleId: (s: string | null) => void
  amountSecondsPassed: number
  setSecondsPassed: (s: number) => void
  interruptCycle: () => void
  finishCycle: () => void
  createNewCycle: (data: NewCycleData) => void
}

export const cycleContext = createContext({} as CyclesContextValues)

export function CycleContextProvider({ children }: PropsWithChildren) {
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [activeCycle, setActiveCycle] = useState<Cycle | undefined>()
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(5)
  const [cycles, setCycles] = useState<Cycle[]>([])

  function getActiveCycle() {
    setActiveCycle(cycles.find((cycle) => cycle.id === activeCycleId))
  }
  useEffect(() => {
    getActiveCycle()
  }, [])
  function catchActiveCycleId(s: string | null) {
    setActiveCycleId(s)
  }
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

    setCycles((curr) => [...curr, newCycle])
    catchActiveCycleId(id)

    setSecondsPassed(0)
  }

  function interruptCycle() {
    const setInterruptedDateInCycle = cycles.map((cycle) => {
      if (cycle.id === activeCycleId) {
        return { ...cycle, interruptedDate: new Date() }
      }
      return cycle
    })
    setCycles(setInterruptedDateInCycle)
    catchActiveCycleId(null)
  }

  function finishCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        }
        return cycle
      }),
    )
    catchActiveCycleId(null)
  }

  const valueToProvide = {
    activeCycleId,
    catchActiveCycleId,
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
