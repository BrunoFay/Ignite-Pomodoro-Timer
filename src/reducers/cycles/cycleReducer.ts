import produce from 'immer'
import { ActionTypeCycle } from './actions'

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

/* FUNCTION SEM  A LIB IMMER export function cyclesReducer(state: CycleReducerState, action: any) {
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
} */

export function cyclesReducer(state: CycleReducerState, action: any) {
  switch (action.type) {
    case ActionTypeCycle.ADD_NEW_CYCLE:
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.cycles)
        draft.activeCycleId = action.payload.activeCycleId
      })

    case ActionTypeCycle.INTERRUPT_CYCLE: {
      const getActiveCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId,
      )
      if (getActiveCycleIndex < 0) {
        return state
      }
      return produce(state, (draft) => {
        draft.activeCycleId = null
        draft.cycles[getActiveCycleIndex].interruptedDate = new Date()
      })
    }
    case ActionTypeCycle.FINISH_CYCLE: {
      const getActiveCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId,
      )
      if (getActiveCycleIndex < 0) {
        return state
      }
      return produce(state, (draft) => {
        draft.activeCycleId = null
        draft.cycles[getActiveCycleIndex].finishedDate = new Date()
      })
    }
    default:
      return state
  }
}
