import React from 'react'

const TodoItem = ({ todo, isActive, onSelectTodo }) => {
  return (
    <li
      className={isActive ? 'deep-orange darken-1' : undefined}
    >
      <a
        onClick={isActive ? undefined : () => onSelectTodo(todo)}
        href='#!'
        className={`waves-effect waves-red ${isActive && 'white-text'}`}
      >
        {
          todo.quantityTasks ?
            <span data-badge-caption='tasks'
                  className='badge new'
            >{todo.quantityTasks}</span> :
            null
        }
        {todo.text}
      </a>
    </li>
  )
};

export default TodoItem
