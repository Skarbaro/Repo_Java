export * from './user'
export * from './todos'

export const RESET_STATE = 'RESET_STATE';

export const resetState = () => ({
  type: RESET_STATE
});
