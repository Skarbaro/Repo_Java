import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { withFirebase } from '../../services'
import { setTodosAndSelectedTodo } from '../../actions'

import { Preloader } from '..'
import TodosList from './TodosList'
import ModalAddTodo from './ModalAddTodo'

class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.onListenerTodos(this.props.userUid)
  }

  componentWillUnmount() {
    this.props.firebase.todos().off()
  }

  onListenerTodos = userUid => {
    this.props.firebase.todos()
      .orderByChild('user')
      .equalTo(userUid)
      .on('value', snapshot => {
        this.props.dispatch(setTodosAndSelectedTodo(snapshot.val()));
        this.setState({ loading: false })
      })
  };

  render() {
    let { loading } = this.state;

    return (
      <Fragment>
        { loading ? <Preloader /> : <TodosList /> }
        <ModalAddTodo />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ userState }) => ({
  userUid: userState && userState.uid
});

export default compose(
  withFirebase,
  connect(mapStateToProps)
)(Todos)
