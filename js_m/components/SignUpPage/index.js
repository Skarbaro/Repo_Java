import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'redux'

import { withFirebase } from '../../services'

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: ''
};

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE
  }

  onChange = event => {
    this.setState({[event.target.name]: event.target.value})
  };

  onSubmit = event => {
    let { username, email, passwordOne } = this.state;
    this.props.firebase.signUp(email, passwordOne)
      .then(authUser => (
        this.props.firebase.user(authUser.user.uid).set({
          username,
          email,
          dateOfCreation: this.props.firebase.serverValue
        })
      ))
      .then(() => {
        this.setState({...INITIAL_STATE});
        this.props.history.push('/manager')
      })
      .catch(error => {
        this.setState({error: error.message})
      });
    event.preventDefault()
  };

  render() {
    let { username, email, passwordOne, passwordTwo, error } = this.state;
    let isInvalid =
      username === '' ||
      email === '' ||
      passwordOne === '' ||
      passwordTwo === '' ||
      passwordOne !== passwordTwo;

    return (
      <div className='row'>
        <div className='col offset-s1 s10 offset-m2 m8 offset-l3 l6'>
          <h5>Sign Up</h5>
          <br />
          <form onSubmit={this.onSubmit}>
            <div className='input-field'>
              <input
                onChange={this.onChange}
                value={username}
                name='username'
                type='text'
                id='username'
                className='validate'
              />
              <label htmlFor='username'>Name</label>
            </div>
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
                value={passwordOne}
                name='passwordOne'
                type='password'
                id='passwordOne'
                className='validate'
              />
              <label htmlFor='passwordOne'>Password</label>
            </div>
            <div className='input-field'>
              <input
                onChange={this.onChange}
                value={passwordTwo}
                name='passwordTwo'
                type='password'
                id='passwordTwo'
                className='validate'
              />
              <label htmlFor='passwordTwo'>Re-enter Password</label>
            </div>
            <p className='red-text'>{error}</p>
            <button
              disabled={isInvalid}
              type='submit'
              className='waves-effect waves-light btn'
            >Create an account</button>
            <p>
              Have an account? <Link to='/sign_in'>Sign In</Link>
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
)(SignUpPage)
