import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const PublicHomePage = () => (
  <Fragment>
    <h5>Home</h5>
    <p>
      Welcome to the little simple task manager.
      To start using the service you need to <Link to='/sign_in'>Sign In</Link>.
    </p>
  </Fragment>
);

export default PublicHomePage

