import { SET_TODOS, SELECT_TODO, SET_TASKS, RESET_STATE } from '../actions'

export const selectTodo = (state = null, action) => {
  switch (action.type) {
    case SELECT_TODO:
      return action.todo;
    case RESET_STATE:
      return null;
    default:
      return state
  }
};

const initialState = {
  todos: [],
  tasks: []
};

export const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TODOS:
      return {
        ...state,
        todos: action.todos
      };
    case SET_TASKS:
      return {
        ...state,
        tasks: action.tasks
      };
    case RESET_STATE:
      return initialState;
    default:
      return state
  }
};
