import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { withFirebase } from '../services'
import { selectTodo } from '../actions'

const withTodos = Component => {
  class WithTodos extends React.Component {
    onSelectTodo = todo => {
      this.props.onSelectTodo(todo)
    };

    onCreateTodo = text => {
      this.props.firebase.todos().push({
        user: this.props.userUid,
        text: text,
        quantityTasks: 0,
        dateOfCreation: this.props.firebase.serverValue
      })
    };

    onRemoveTodo = todo => {
      this.props.firebase.todo(todo.uid).remove()
        .then(() => {
          if (todo.uid === this.props.selectedTodo.uid) {
            this.props.onSelectTodo(null)
          }
        }).then(() => {
          let tasksRef = this.props.firebase.tasks();
          tasksRef.orderByChild('todo')
            .equalTo(todo.uid)
            .once('value', snapshot => {
              let updates = {};
              snapshot.forEach(task => updates[task.key] = null);
              tasksRef.update(updates)
            })
        });
    };

    render() {
      return <Component
        {...this.props}
        onSelectTodo={this.onSelectTodo}
        onCreateTodo={this.onCreateTodo}
        onRemoveTodo={this.onRemoveTodo}
      />
    }
  }

  const mapStateToProps = ({ userState, todosState, selectedTodo }) => ({
    userUid: userState && userState.uid,
    todos: todosState.todos,
    selectedTodo
  });

  const mapDispatchToProps = dispatch => ({
    onSelectTodo: todo => dispatch(selectTodo(todo))
  });

  return compose(
    withFirebase,
    connect(mapStateToProps, mapDispatchToProps)
  )(WithTodos)
};

export default withTodos
