import { createContext, PropsWithChildren, useState } from 'react'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesContextValues {
  getActiveCycle: (s: Cycle[]) => void
  activeCycleId: string | null
  activeCycle: Cycle | undefined
  getActiveCycleId: (s: string | null) => void
  amountSecondsPassed: number
  setSecondsPassed: (s: number) => void
}

export const cycleContext = createContext({} as CyclesContextValues)

export function CycleContextProvider({ children }: PropsWithChildren) {
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [activeCycle, setActiveCycle] = useState<Cycle | undefined>()
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(5)

  function getActiveCycle(cycles: Cycle[]) {
    setActiveCycle(cycles.find((cycle) => cycle.id === activeCycleId))
  }
  function getActiveCycleId(s: string | null) {
    setActiveCycleId(s)
  }
  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }
  const valueToProvide = {
    activeCycleId,
    getActiveCycleId,
    getActiveCycle,
    activeCycle,
    amountSecondsPassed,
    setSecondsPassed,
  }
  return (
    <cycleContext.Provider value={valueToProvide}>
      {children}
    </cycleContext.Provider>
  )
}
