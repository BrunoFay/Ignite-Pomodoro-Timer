import { Cycle } from './cycleReducer'

export enum ActionTypeCycle {
  // eslint-disable-next-line no-unused-vars
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  // eslint-disable-next-line no-unused-vars
  INTERRUPT_CYCLE = 'INTERRUPT_CYCLE',
  // eslint-disable-next-line no-unused-vars
  FINISH_CYCLE = 'FINISH_CYCLE',
}

export function createNewCycleAction(newCycle: Cycle, id: string) {
  return {
    type: ActionTypeCycle.ADD_NEW_CYCLE,
    payload: { cycles: newCycle, activeCycleId: id },
  }
}

export function interruptCycleAction() {
  return {
    type: ActionTypeCycle.INTERRUPT_CYCLE,
  }
}

export function finishCycleAction() {
  return {
    type: ActionTypeCycle.FINISH_CYCLE,
  }
}
