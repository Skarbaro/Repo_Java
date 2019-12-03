import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { Tasks } from '..'

const HomePage = ({ selectedTodo }) => (
  <Fragment>
    <h5>Tasks</h5>
    {
      selectedTodo ?
        <Tasks
          selectedTodoUid={selectedTodo.uid}
        /> :
        <p>
          You need to select or create and select To-Do List.
        </p>
    }
  </Fragment>
);

const mapDispatchToProps = ({ selectedTodo }) => ({
  selectedTodo
});

export default connect(mapDispatchToProps)(HomePage)
