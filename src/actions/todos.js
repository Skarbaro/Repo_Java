export const SET_TODOS = 'SET_TODOS';
export const SELECT_TODO = 'SELECT_TODO';
export const SET_TASKS = 'SET_TASKS';

export const setTodos = todos => ({
  type: SET_TODOS,
  todos
});

export const selectTodo = todo => ({
  type: SELECT_TODO,
  todo
});

export const setTasks = tasks => ({
  type: SET_TASKS,
  tasks
});

// thunk functions

export const setTodosAndSelectedTodo = todos => (dispatch, getState) => {
  let listTodos = [];
  let selectedTodo = getState().selectedTodo;
  Object.keys(todos || []).map(key => {
    let todo = {
      ...todos[key],
      uid: key
    };
    if (selectedTodo) {
      if (selectedTodo.uid === key) {
        dispatch(selectTodo(todo))
      }
    }
    return listTodos.push(todo)
  });
  dispatch(setTodos(listTodos))
};
