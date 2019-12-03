import { combineReducers } from 'redux'

import { userReducer } from './user'
import { todosReducer, selectTodo } from './todos'

export const rootReducer = combineReducers({
  userState: userReducer,
  todosState: todosReducer,
  selectedTodo: selectTodo
});
