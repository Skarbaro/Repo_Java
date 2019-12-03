import React, { Component } from 'react'
import M from 'materialize-css'

class TaskEditMode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      deadline: null
    }
  }

  componentWillMount() {
    if (this.props.task) {
      this.setState({
        text: this.props.task.text,
        deadline: this.props.task.deadline
      })
    }
  }

  componentDidMount() {
    this.datepicker = M.Datepicker.init(this._datepicker, {
      format: 'dd.mm.yyyy',
      onClose: this.onChangeDate
    })
  }

  componentWillUnmount() {
    this.datepicker && this.datepicker.destroy()
  }

  onChangeText = event => {
    this.setState({ text: event.target.value })
  };

  onChangeDate = () => {
    this.setState({ deadline: this.datepicker.toString() })
  };

  render() {
    let { onSubmit, onCancel, task } = this.props;
    let { text, deadline } = this.state;
    let isInvalid = text === '';

    return (
      <form onSubmit={event => onSubmit(event, text, deadline)}>
        <div className='row'>
          <div className='input-field col s12 m6 l6'>
            <i className='material-icons prefix'>create</i>
            <input
              onChange={this.onChangeText}
              value={text}
              name='text'
              id='add_task'
              type='text'
            />
            <label htmlFor='add_task' className={task && 'active'}>Task</label>
          </div>
          <div className='input-field col s12 m6 l6'>
            <i className='material-icons prefix'>date_range</i>
            <input
              ref={input => { this._datepicker = input }}
              defaultValue={deadline}
              id='deadline'
              type='text'
              className='datepicker'
            />
            <label htmlFor='deadline' className={task && task.deadline && 'active'}>Deadline</label>
          </div>
        </div>
        <button
          disabled={isInvalid}
          type='submit'
          className='btn-flat waves-effect waves-green'
        >Ok</button>
        <button
          onClick={onCancel}
          className='btn-flat waves-effect waves-red'
        >Cancel</button>
      </form>
    )
  }
}

export default TaskEditMode
