import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'

import { withFirebase } from '../../services'
import { resetState } from '../../actions'

const SignOut = ({ firebase, history, dispatch }) => (
  <a
    href='#!'
    onClick={
      () => {
        firebase.signOut()
          .then(() => history.push('/'))
          .then(() => dispatch(resetState()))
      }
    }
    className='waves-effect waves-red'
  ><i className='material-icons'>exit_to_app</i>Sign Out</a>
);

export default compose(
  withFirebase,
  withRouter,
  connect()
)(SignOut)
