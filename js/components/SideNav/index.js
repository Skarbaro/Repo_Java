import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'

import { withUser } from '../../hocs'

import { SignOut, Todos, UserBar } from '..'

const SideNavNonAuth = () => (
  <Fragment>
    <li><NavLink
      to='/'
      className='waves-effect waves-red'
    ><i className='material-icons'>home</i>Home</NavLink></li>
    <li><NavLink
      to='/sign_in'
      className='waves-effect waves-red'
    ><i className='material-icons'>account_circle</i>Sign In</NavLink></li>
  </Fragment>
);

const SideNavAuth = () => (
  <Fragment>
    <li><UserBar /></li>
    <li><SignOut /></li>
    <li><div className='divider' /></li>
    <li><a href='#!' className='subheader'>To-Do Lists:</a></li>
    <Todos />
  </Fragment>
);

const SideNav = ({ user }) => (
  <ul id='slide_out' className='sidenav sidenav-fixed deep-orange accent-1'>
    {user ? <SideNavAuth /> : <SideNavNonAuth/>}
  </ul>
);

export default withUser(SideNav)
