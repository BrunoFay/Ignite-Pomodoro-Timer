export enum ActionTypeCycle {
  // eslint-disable-next-line no-unused-vars
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  // eslint-disable-next-line no-unused-vars
  INTERRUPT_CYCLE = 'INTERRUPT_CYCLE',
  // eslint-disable-next-line no-unused-vars
  FINISH_CYCLE = 'FINISH_CYCLE',
}
export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}
interface CycleReducerState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function cyclesReducer(state: CycleReducerState, action: any) {
  switch (action.type) {
    case ActionTypeCycle.ADD_NEW_CYCLE:
      return {
        ...state,
        cycles: [...state.cycles, action.payload.cycles],
        activeCycleId: action.payload.activeCycleId,
      }
    case ActionTypeCycle.INTERRUPT_CYCLE:
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
    case ActionTypeCycle.FINISH_CYCLE:
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
}
