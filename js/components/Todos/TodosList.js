import React from 'react'

import { withTodos } from '../../hocs'

import TodoItem from './TodoItem'

const TodosList = ({ todos, selectedTodo, onSelectTodo }) => (
  todos.length ?
    todos.map(todo => (
      <TodoItem
        key={todo.uid}
        todo={todo}
        isActive={selectedTodo && selectedTodo.uid === todo.uid}
        onSelectTodo={onSelectTodo}
      />
    )) :
    <li>
      <a href='#!' className='subheader'>Create the first list.</a>
    </li>
);

export default withTodos(TodosList)
