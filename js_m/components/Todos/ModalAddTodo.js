import React, { Component } from 'react'
import { createPortal } from 'react-dom'
import M from 'materialize-css'

import { withTodos } from '../../hocs'

class ModalAddTodo extends Component {
  constructor(props) {
    super(props);
    this.createRoot();
    this.state = {
      text: ''
    }
  }

  createRoot = () => {
    this.modalRoot = document.createElement('div');
    document.body.appendChild(this.modalRoot)
  };

  componentDidMount() {
    this.modal = M.Modal.init(this._modal)
  }

  componentWillUnmount() {
    document.body.removeChild(this.modalRoot);
    this.modal && this.modal.destroy()
  }

  renderModal = () => {
    let { text } = this.state;
    let isInvalid = text === '';

    return (
      this.modalRoot &&
      createPortal(
        <div
          ref={div => { this._modal = div }}
          className='modal'
        >
          <div className='modal-content'>
            <h6>Enter List Name</h6>
            <form onSubmit={event => this.onCreateTodo(event, text)}>
              <div className='input-field'>
                <i className='material-icons prefix'>create</i>
                <input
                  onChange={this.onChangeText}
                  value={text}
                  type='text'
                  id='new_todo'
                />
                <label htmlFor='new_todo'>To-Do List</label>
              </div>
              <button
                disabled={isInvalid}
                type='submit'
                className='btn-flat waves-effect waves-green'
              >Ok</button>
              <button
                onClick={this.onClose}
                className='btn-flat waves-effect waves-red'
              >Cancel</button>
            </form>
          </div>
        </div>,
        this.modalRoot
      )
    )
  };

  onOpen = event => {
    event.preventDefault();
    this.modal.open()
  };

  onClose = event => {
    event.preventDefault();
    this.modal.close()
  };

  onChangeText = event => {
    this.setState({ text: event.target.value })
  };

  onCreateTodo = (event, text) => {
    event.preventDefault();
    this.props.onCreateTodo(text);
    this.setState({ text: '' });
    this.onClose(event)
  };

  render() {
    return (
      <li>
        <a
          href='#!'
          onClick={this.onOpen}
          className='waves-effect waves-red'
        ><i className="material-icons">add</i>New List</a>
        {this.renderModal()}
      </li>
    )
  }
}

export default withTodos(ModalAddTodo)
