import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'redux'

import { withFirebase } from '../../services'

const INITIAL_STATE = {
  email: '',
  password: '',
  error: ''
};

class SignInPage extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE
  }

  onChange = event => {
    this.setState({[event.target.name]: event.target.value})
  };

  onSubmit = event => {
    let { email, password } = this.state;
    this.props.firebase.signIn(email, password)
      .then(() => {
        this.setState({...INITIAL_STATE});
        this.props.history.push('/manager')
      })
      .catch(error => {
        this.setState({
          password: '',
          error: error.message
        })
      });
    event.preventDefault()
  };

  render() {
    let { email, password, error } = this.state;
    let isInvalid =
      email === '' ||
      password === '';

    return (
      <div className='row'>
        <div className='col offset-s1 s10 offset-m2 m8 offset-l3 l6'>
          <h5>Sign In</h5>
          <br />
          <form onSubmit={this.onSubmit}>
            <div className='input-field'>
              <input
                onChange={this.onChange}
                value={email}
                name='email'
                type='email'
                id='email'
                className='validate'
              />
              <label htmlFor='email'>Email</label>
            </div>
            <div className='input-field'>
              <input
                onChange={this.onChange}
                value={password}
                name='password'
                type='password'
                id='password'
                className='validate'
              />
              <label htmlFor='password'>Password</label>
            </div>
            <p className='red-text'>{error}</p>
            <button
              disabled={isInvalid}
              type='submit'
              className='waves-effect waves-light btn'
            >Sign in</button>
            <p>
              Don't have an account? <Link to='/sign_up'>Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    )
  }
}

export default compose(
  withFirebase,
  withRouter
)(SignInPage)
